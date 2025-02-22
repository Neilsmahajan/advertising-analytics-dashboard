import os, sys
import csv
from flask import jsonify
from bingads.v13.reporting import ReportingDownloadParameters, ReportingServiceManager
from bingads.authorization import AuthorizationData, OAuthWebAuthCodeGrant
from bingads.service_client import ServiceClient

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

DEVELOPER_TOKEN = os.getenv("MICROSOFT_ADS_DEVELOPER_TOKEN")  # Your developer token
ENVIRONMENT = "production"  # Change to 'production' for live data
CLIENT_ID = os.getenv("MICROSOFT_ADS_CLIENT_ID")  # Your new client ID
CLIENT_SECRET = os.getenv("MICROSOFT_ADS_CLIENT_SECRET")  # Your client secret
REDIRECTION_URI = "http://localhost:3000/en/microsoft-ads"
CLIENT_STATE = "ClientStateGoesHere"
REPORT_FILE_FORMAT = "Csv"
FILE_DIRECTORY = "./microsoft_ads/results"
RESULT_FILE_NAME = "result." + REPORT_FILE_FORMAT.lower()
TIMEOUT_IN_MILLISECONDS = 3600000


def analyze_microsoft_ads(req):
    data = req.get_json()
    account_id = data.get("accountId")
    customer_id = data.get("customerId")
    current_url = data.get("currentUrl")

    result = fetch_microsoft_ads_data(account_id, customer_id, current_url)
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200


def fetch_microsoft_ads_data(account_id, customer_id, response_uri):
    """Fetch Microsoft Ads data from the Microsoft Ads API."""
    try:
        if not account_id or not customer_id or not response_uri:
            return {"error": "Both Account ID and Customer ID are required."}

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

    authentication = OAuthWebAuthCodeGrant(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,  # Add client secret here
        redirection_uri=REDIRECTION_URI,  # Add redirection URI here
        env=ENVIRONMENT,
    )
    authentication.state = CLIENT_STATE
    authorization_data.authentication = authentication

    authorization_data.authentication.request_oauth_tokens_by_response_uri(
        response_uri=response_uri
    )
    customer_service = ServiceClient(
        service="CustomerManagementService",
        version=13,
        authorization_data=authorization_data,
        environment=ENVIRONMENT,
    )
    user = get_user_response = customer_service.GetUser(UserId=None).User
    accounts = search_accounts_by_user_id(customer_service, user.Id)
    authorization_data.account_id = accounts["AdvertiserAccount"][0].Id
    authorization_data.customer_id = accounts["AdvertiserAccount"][0].ParentCustomerId

    # Create results directory of {current_file_directory}/FILE_DIRECTORY/{account_id}/
    results_directory = FILE_DIRECTORY
    if not os.path.exists(results_directory):
        os.makedirs(results_directory)

    # Set the correct account and customer IDs
    authorization_data.account_id = account_id
    authorization_data.customer_id = customer_id

    # You can submit one of the example reports, or build your own.

    report_request = get_report_request(
        authorization_data.account_id, reporting_service=reporting_service
    )

    reporting_download_parameters = ReportingDownloadParameters(
        report_request=report_request,
        result_file_directory=results_directory,
        result_file_name=RESULT_FILE_NAME,
        overwrite_result_file=True,  # Set this value true if you want to overwrite the same file.
        timeout_in_milliseconds=TIMEOUT_IN_MILLISECONDS,  # You may optionally cancel the download after a specified time interval.
    )
    # background_completion(reporting_download_parameters, reporting_service_manager)
    results = download_report(reporting_download_parameters, reporting_service_manager)
    return results


def search_accounts_by_user_id(customer_service, user_id):
    """
    Search for account details by UserId.

    :param user_id: The Bing Ads user identifier.
    :type user_id: long
    :return: List of accounts that the user can manage.
    :rtype: Dictionary of AdvertiserAccount
    """

    predicates = {
        "Predicate": [
            {
                "Field": "UserId",
                "Operator": "Equals",
                "Value": user_id,
            },
        ]
    }

    accounts = []

    page_index = 0
    PAGE_SIZE = 100
    found_last_page = False

    while not found_last_page:
        paging = set_elements_to_none(customer_service.factory.create("ns5:Paging"))
        paging.Index = page_index
        paging.Size = PAGE_SIZE
        search_accounts_response = customer_service.SearchAccounts(
            PageInfo=paging, Predicates=predicates
        )

        if search_accounts_response is not None and hasattr(
            search_accounts_response, "AdvertiserAccount"
        ):
            accounts.extend(search_accounts_response["AdvertiserAccount"])
            found_last_page = PAGE_SIZE > len(
                search_accounts_response["AdvertiserAccount"]
            )
            page_index += 1
        else:
            found_last_page = True

    return {"AdvertiserAccount": accounts}


def set_elements_to_none(suds_object):
    # Bing Ads Campaign Management service operations require that if you specify a non-primitive,
    # it must be one of the values defined by the service i.e. it cannot be a nil element.
    # Since SUDS requires non-primitives and Bing Ads won't accept nil elements in place of an enum value,
    # you must either set the non-primitives or they must be set to None. Also in case new properties are added
    # in a future service release, it is a good practice to set each element of the SUDS object to None as a baseline.

    for element in suds_object:
        suds_object.__setitem__(element[0], None)
    return suds_object


def get_report_request(account_id, reporting_service):
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

    # BudgetSummaryReportRequest does not contain a definition for Aggregation.
    # budget_summary_report_request = get_budget_summary_report_request(
    #     account_id=account_id,
    #     exclude_column_headers=exclude_column_headers,
    #     exclude_report_footer=exclude_report_footer,
    #     exclude_report_header=exclude_report_header,
    #     report_file_format=REPORT_FILE_FORMAT,
    #     return_only_complete_data=return_only_complete_data,
    #     time=time,
    # )

    campaign_performance_report_request = get_campaign_performance_report_request(
        account_id=account_id,
        aggregation=aggregation,
        exclude_column_headers=exclude_column_headers,
        exclude_report_footer=exclude_report_footer,
        exclude_report_header=exclude_report_header,
        report_file_format=REPORT_FILE_FORMAT,
        return_only_complete_data=return_only_complete_data,
        time=time,
        reporting_service=reporting_service,
    )

    # keyword_performance_report_request = get_keyword_performance_report_request(
    #     account_id=account_id,
    #     aggregation=aggregation,
    #     exclude_column_headers=exclude_column_headers,
    #     exclude_report_footer=exclude_report_footer,
    #     exclude_report_header=exclude_report_header,
    #     report_file_format=REPORT_FILE_FORMAT,
    #     return_only_complete_data=return_only_complete_data,
    #     time=time,
    # )

    # user_location_performance_report_request = (
    #     get_user_location_performance_report_request(
    #         account_id=account_id,
    #         aggregation=aggregation,
    #         exclude_column_headers=exclude_column_headers,
    #         exclude_report_footer=exclude_report_footer,
    #         exclude_report_header=exclude_report_header,
    #         report_file_format=REPORT_FILE_FORMAT,
    #         return_only_complete_data=return_only_complete_data,
    #         time=time,
    #     )
    # )

    return campaign_performance_report_request


def get_campaign_performance_report_request(
    account_id,
    aggregation,
    exclude_column_headers,
    exclude_report_footer,
    exclude_report_header,
    report_file_format,
    return_only_complete_data,
    time,
    reporting_service,
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


def background_completion(reporting_download_parameters, reporting_service_manager):
    """You can submit a download request and the ReportingServiceManager will automatically
    return results. The ReportingServiceManager abstracts the details of checking for result file
    completion, and you don't have to write any code for results polling."""

    result_file_path = reporting_service_manager.download_file(
        reporting_download_parameters
    )
    print("Download result file: {0}".format(result_file_path))


def download_report(reporting_download_parameters, reporting_service_manager):
    """You can get a Report object by submitting a new download request via ReportingServiceManager.
    Although in this case you will not work directly with the file, under the covers a request is
    submitted to the Reporting service and the report file is downloaded to a local directory.
    """

    report_container = reporting_service_manager.download_report(
        reporting_download_parameters
    )

    # Otherwise if you already have a report file that was downloaded via the API,
    # you can get a Report object via the ReportFileReader.

    # report_file_reader = ReportFileReader(
    #     file_path = reporting_download_parameters.result_file_directory + reporting_download_parameters.result_file_name,
    #     format = reporting_download_parameters.report_request.Format)
    # report_container = report_file_reader.get_report()

    if report_container == None:
        print("There is no report data for the submitted report request parameters.")
        sys.exit(0)

    # Once you have a Report object via either workflow above, you can access the metadata and report records.

    # Output the report metadata

    record_count = report_container.record_count
    print("ReportName: {0}".format(report_container.report_name))
    print(
        "ReportTimeStart: {0}".format(report_container.report_time_start)
    )
    print("ReportTimeEnd: {0}".format(report_container.report_time_end))
    print(
        "LastCompletedAvailableDate: {0}".format(
            report_container.last_completed_available_date
        )
    )
    print(
        "ReportAggregation: {0}".format(report_container.report_aggregation)
    )
    print(
        "ReportColumns: {0}".format(
            "; ".join(str(column) for column in report_container.report_columns)
        )
    )
    print("ReportRecordCount: {0}".format(record_count))

    # Analyze and output performance statistics

    total_impressions = 0
    total_clicks = 0
    total_spend = 0

    if (
        "Impressions" in report_container.report_columns
        and "Clicks" in report_container.report_columns
        and "DeviceType" in report_container.report_columns
        and "Network" in report_container.report_columns
    ):

        report_record_iterable = report_container.report_records

        distinct_devices = set()
        distinct_networks = set()
        for record in report_record_iterable:
            total_impressions += record.int_value("Impressions")
            total_clicks += record.int_value("Clicks")
            total_spend += record.int_value("Spend")
            distinct_devices.add(record.value("DeviceType"))
            distinct_networks.add(record.value("Network"))

        print("Total Impressions: {0}".format(total_impressions))
        print("Total Clicks: {0}".format(total_clicks))
        print("Total Spend: {0}".format(total_spend))
        print(
            "Average Impressions: {0}".format(total_impressions * 1.0 / record_count)
        )
        print(
            "Average Clicks: {0}".format(total_clicks * 1.0 / record_count)
        )
        print(
            "Average Spend: {0}".format(total_spend * 1.0 / record_count)
        )
        print(
            "Distinct Devices: {0}".format(
                "; ".join(str(device) for device in distinct_devices)
            )
        )
        print(
            "Distinct Networks: {0}".format(
                "; ".join(str(network) for network in distinct_networks)
            )
        )

    # Be sure to close the report.

    report_container.close()
    
    # return total_impressions, total_clicks, total_spend
    return {"total_impressions": total_impressions, "total_clicks": total_clicks, "total_spend": total_spend}