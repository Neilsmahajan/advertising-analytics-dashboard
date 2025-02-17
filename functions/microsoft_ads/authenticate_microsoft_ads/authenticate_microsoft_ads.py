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


def authenticate_microsoft_ads(req):
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
