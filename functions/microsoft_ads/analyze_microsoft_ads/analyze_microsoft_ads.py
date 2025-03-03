import os, sys
import csv
from flask import jsonify, request
from bingads.v13.reporting import ReportingDownloadParameters, ReportingServiceManager
from bingads.authorization import AuthorizationData, OAuthWebAuthCodeGrant
from bingads.service_client import ServiceClient

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

DEVELOPER_TOKEN = os.getenv("MICROSOFT_ADS_DEVELOPER_TOKEN")  # Your developer token
ENVIRONMENT = "production"  # Change to 'production' for live data
CLIENT_ID = os.getenv("MICROSOFT_ADS_CLIENT_ID")  # Your new client ID
CLIENT_SECRET = os.getenv("MICROSOFT_ADS_CLIENT_SECRET")  # Your client secret
CLIENT_STATE = "ClientStateGoesHere"
REPORT_FILE_FORMAT = "Csv"
FILE_DIRECTORY = "./microsoft_ads/results"
RESULT_FILE_NAME = "result." + REPORT_FILE_FORMAT.lower()
TIMEOUT_IN_MILLISECONDS = 3600000


def analyze_microsoft_ads(req):
    data = req.get_json() or {}
    account_id = data.get("accountId")
    customer_id = data.get("customerId")
    current_url = data.get("currentUrl")
    lang = data.get("lang", "en")
    redirection_uri = (
        "https://advertisinganalyticsdashboard.com/fr/microsoft-ads"
        # "http://localhost:3000/fr/microsoft-ads"
        if lang == "fr"
        else "https://advertisinganalyticsdashboard.com/en/microsoft-ads"
        # "http://localhost:3000/en/microsoft-ads"
    )

    result = fetch_microsoft_ads_data(
        account_id, customer_id, current_url, redirection_uri
    )
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200


def fetch_microsoft_ads_data(account_id, customer_id, response_uri, redirection_uri):
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
        client_secret=CLIENT_SECRET,
        redirection_uri=redirection_uri,
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

    results_directory = FILE_DIRECTORY
    if not os.path.exists(results_directory):
        os.makedirs(results_directory)

    authorization_data.account_id = account_id
    authorization_data.customer_id = customer_id

    # Pass start and end dates along to get_report_request
    start_date = request.get_json().get("startDate")
    end_date = request.get_json().get("endDate")
    report_request = get_report_request(
        authorization_data.account_id, reporting_service, start_date, end_date
    )

    reporting_download_parameters = ReportingDownloadParameters(
        report_request=report_request,
        result_file_directory=results_directory,
        result_file_name=RESULT_FILE_NAME,
        overwrite_result_file=True,
        timeout_in_milliseconds=TIMEOUT_IN_MILLISECONDS,
    )
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


def get_report_request(account_id, reporting_service, start_date, end_date):
    """
    Build the Campaign Performance Report Request using a custom date range.
    """
    aggregation = "Daily"
    exclude_column_headers = False
    exclude_report_footer = False
    exclude_report_header = False

    time = reporting_service.factory.create("ReportTime")
    # Parse the date strings assuming "YYYY-MM-DD" format.
    start_year, start_month, start_day = map(int, start_date.split("-"))
    end_year, end_month, end_day = map(int, end_date.split("-"))
    custom_start = reporting_service.factory.create("Date")
    custom_start.Year = start_year
    custom_start.Month = start_month
    custom_start.Day = start_day
    custom_end = reporting_service.factory.create("Date")
    custom_end.Year = end_year
    custom_end.Month = end_month
    custom_end.Day = end_day

    time.PredefinedTime = None  # Disable predefined time
    time.CustomDateRangeStart = custom_start
    time.CustomDateRangeEnd = custom_end

    return_only_complete_data = False

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

    if report_container is None:
        print("There is no report data for the submitted report request parameters.")
        sys.exit(0)

    # Initialize overall totals and campaign details list
    total_impressions = 0
    total_clicks = 0
    total_spend = 0
    campaigns = []

    for record in report_container.report_records:
        impression = record.int_value("Impressions")
        click = record.int_value("Clicks")
        spend = record.int_value("Spend")
        camp_id = record.value("CampaignId")
        camp_name = record.value("CampaignName")

        total_impressions += impression
        total_clicks += click
        total_spend += spend
        campaigns.append(
            {
                "CampaignId": camp_id,
                "CampaignName": camp_name,
                "Impressions": impression,
                "Clicks": click,
                "Spend": spend,
            }
        )

    print("Total Impressions: {0}".format(total_impressions))
    print("Total Clicks: {0}".format(total_clicks))
    print("Total Spend: {0}".format(total_spend))

    report_container.close()

    return {
        "total_impressions": total_impressions,
        "total_clicks": total_clicks,
        "total_spend": total_spend,
        "campaigns": campaigns,
    }
