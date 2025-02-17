import os, sys
from bingads.authorization import AuthorizationData

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from auth_helper import (
    authenticate,
    DEVELOPER_TOKEN,
)


def authenticate_microsoft_ads(req):
    authorization_data = AuthorizationData(
        account_id=None,
        customer_id=None,
        developer_token=DEVELOPER_TOKEN,
        authentication=None,
    )

    authenticate(authorization_data)
