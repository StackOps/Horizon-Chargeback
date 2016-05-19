# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import traceback
import time
from time import mktime
from datetime import datetime
from requests.auth import HTTPBasicAuth
from openstack_dashboard.api import base
from django.template.defaultfilters import register
from django.utils.translation import ugettext_lazy as _
import requests

from json import dumps
from horizon import exceptions
requests.packages.urllib3.disable_warnings()


json_headers = {'Accept': 'application/json'}

class Account:
    """
    Accounts data
    """

    def __init__(self, id, name, description, balance):
        self.id = id
        self.name = name
        self.description = description
        self.balance = balance

def getAccount(self, token=None, status="ACTIVE"):
    chargeback_url = base.url_for(self.request, 'chargeback', 'publicURL')
    token = self.request.session.get('token').id

    headers = {"X-Auth-Token": "%s" % token, 'Accept': 'application/json'}
    try:
        r = requests.get(chargeback_url + "api/account/current", headers=headers, verify=False)
        account = [];
        data =r.json()['account']
        account.append(Account(data[u'id'], data[u'name'], data[u'description'], data[u'balance']))
        return account

    except:
        exceptions.handle(self.request, _('Unable to get accounts'))
        return []
