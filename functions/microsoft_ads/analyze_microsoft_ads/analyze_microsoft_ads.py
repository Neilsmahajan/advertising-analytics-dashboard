import os, sys
import logging
from flask import jsonify
from bingads.v13.reporting import (
    ReportingDownloadParameters,
    ReportingDownloadOperation,
    ReportingServiceManager,
)
from bingads.authorization import AuthorizationData
from bingads.service_client import ServiceClient

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from auth_helper import (
    authenticate,
    DEVELOPER_TOKEN,
    ENVIRONMENT,
    output_status_message,
    output_webfault_errors,
    WebFault,
)

REPORT_FILE_FORMAT = "Csv"
FILE_DIRECTORY = "./results"
RESULT_FILE_NAME = "result." + REPORT_FILE_FORMAT.lower()
TIMEOUT_IN_MILLISECONDS = 3600000


def analyze_microsoft_ads(req):
    data = req.get_json()
    account_id = data.get("accountId")
    customer_id = data.get("customerId")
    current_url = data.get("currentUrl")

    result = fetch_microsoft_ads_data(account_id, customer_id)
    return jsonify(result)


def fetch_microsoft_ads_data(account_id, customer_id):
    """Fetch Microsoft Ads data from the Microsoft Ads API."""
    try:
        if not account_id or not customer_id:
            return {"error": "Both Account ID and Customer ID are required."}, 400

    except Exception as e:
        return {"error": str(e)}

    authorization_data = AuthorizationData(
        account_id=None,
        customer_id=None,
        developer_token=DEVELOPER_TOKEN,
        authentication=None,
    )

    reporting_service_manager = ReportingServiceManager(
        authorization_data=authorization_data,
        poll_interval_in_milliseconds=5000,
        environment=ENVIRONMENT,
    )

    reporting_service = ServiceClient(
        service="ReportingService",
        version=13,
        authorization_data=authorization_data,
        environment=ENVIRONMENT,
    )

    authenticate(authorization_data)

    try:
        results_directory = os.path.join(
            FILE_DIRECTORY, str(authorization_data.account_id)
        )
        if not os.path.exists(results_directory):
            os.makedirs(results_directory)

        # Set the correct account and customer IDs
        authorization_data.account_id = account_id
        authorization_data.customer_id = customer_id

        report_request = get_report_request(
            reporting_service, authorization_data.account_id
        )

        reporting_download_parameters = ReportingDownloadParameters(
            report_request=report_request,
            result_file_directory=results_directory,
            result_file_name=RESULT_FILE_NAME,
            overwrite_result_file=True,  # Set this value true if you want to overwrite the same file.
            timeout_in_milliseconds=TIMEOUT_IN_MILLISECONDS,  # You may optionally cancel the download after a specified time interval.
        )

        output_status_message("-----\nAwaiting Background Completion...")
        background_completion(reporting_service_manager, reporting_download_parameters)

    except WebFault as ex:
        output_webfault_errors(ex)
    except Exception as ex:
        output_status_message(ex)

    # Example return of impressions, clicks, and spend
    return {"data": [{"impressions": 1000, "clicks": 100, "spend": 1000}]}


def background_completion(reporting_service_manager, reporting_download_parameters):
    """You can submit a download request and the ReportingServiceManager will automatically
    return results. The ReportingServiceManager abstracts the details of checking for result file
    completion, and you don't have to write any code for results polling."""

    result_file_path = reporting_service_manager.download_file(
        reporting_download_parameters
    )
    output_status_message("Download result file: {0}".format(result_file_path))


def get_report_request(reporting_service, account_id):
    """
    Use a sample report request or build your own.
    """

    aggregation = "Daily"
    exclude_column_headers = False
    exclude_report_footer = False
    exclude_report_header = False
    time = reporting_service.factory.create("ReportTime")
    # You can either use a custom date range or predefined time.
    time.PredefinedTime = "Yesterday"
    time.ReportTimeZone = "PacificTimeUSCanadaTijuana"
    time.CustomDateRangeStart = None
    time.CustomDateRangeEnd = None
    return_only_complete_data = False

    campaign_performance_report_request = get_campaign_performance_report_request(
        reporting_service=reporting_service,
        account_id=account_id,
        aggregation=aggregation,
        exclude_column_headers=exclude_column_headers,
        exclude_report_footer=exclude_report_footer,
        exclude_report_header=exclude_report_header,
        report_file_format=REPORT_FILE_FORMAT,
        return_only_complete_data=return_only_complete_data,
        time=time,
    )

    return campaign_performance_report_request


def get_campaign_performance_report_request(
    reporting_service,
    account_id,
    aggregation,
    exclude_column_headers,
    exclude_report_footer,
    exclude_report_header,
    report_file_format,
    return_only_complete_data,
    time,
):

    report_request = reporting_service.factory.create(
        "CampaignPerformanceReportRequest"
    )
    report_request.Aggregation = aggregation
    report_request.ExcludeColumnHeaders = exclude_column_headers
    report_request.ExcludeReportFooter = exclude_report_footer
    report_request.ExcludeReportHeader = exclude_report_header
    report_request.Format = report_file_format
    report_request.ReturnOnlyCompleteData = return_only_complete_data
    report_request.Time = time
    report_request.ReportName = "My Campaign Performance Report"
    scope = reporting_service.factory.create("AccountThroughCampaignReportScope")
    scope.AccountIds = {"long": [account_id]}
    scope.Campaigns = None
    report_request.Scope = scope

    report_columns = reporting_service.factory.create(
        "ArrayOfCampaignPerformanceReportColumn"
    )
    report_columns.CampaignPerformanceReportColumn.append(
        [
            "TimePeriod",
            "CampaignId",
            "CampaignName",
            "DeviceType",
            "Network",
            "Impressions",
            "Clicks",
            "Spend",
        ]
    )
    report_request.Columns = report_columns

    return report_request
