# Copyright 2012 United States Government as represented by the
# Administrator of the National Aeronautics and Space Administration.
# All Rights Reserved.
#
# Copyright 2012 OpenStack Foundation
# Copyright 2012 Nebula, Inc.
# Copyright (c) 2012 X.commerce, a business unit of eBay Inc.
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from __future__ import absolute_import

import logging
from django.utils.functional import cached_property  # noqa
import requests
from django.conf import settings
from django.utils.translation import pgettext_lazy
from django.utils.translation import ugettext_lazy as _
from horizon import exceptions
from horizon.utils import functions as utils
from horizon.utils.memoized import memoized  # noqa

from openstack_dashboard.api import base
LOG = logging.getLogger(__name__)


# class Account(base.APIResourceWrapper):
#     """
#     Accounts data
#     """
#     _attrs = ['id', 'name', 'description', 'balance']
#
#     def __init__(self, apiresource, request):
#         super(Account, self).__init__(apiresource)
#         self.request = request


def get_all_accounts(request, status="A"):
    token_ = request.session.get('token').id
    url_ = base.url_for(request, 'chargeback', 'publicURL')
    headers = {"X-Auth-Token": "%s" % token_, 'Accept': 'application/json'}

    try:
        r = requests.get("%sapi/account" % url_, headers=headers, verify=False)
        data = r.json()
        return data
    except:
        exceptions.handle(request, _('Unable to get all the accounts'))
        return []

def get_all_account_with_status(request, status="ACTIVE"):
    token_ = request.session.get('token').id
    url_ = base.url_for(request, 'chargeback', 'publicURL')
    headers = {"X-Auth-Token": "%s" % token_, 'Accept': 'application/json'}

    try:
        r = requests.get("%sapi/account" % url_, headers=headers, verify=False)
        data = r.json()
        accounts = []

        for account in data["accounts"]:
            if account["status"] == status or status == "ALL":
                accounts.append(account)
        return accounts
    except:
        exceptions.handle(request, _('Unable to get all the accounts'))
        return []

def get_current_account(request):
    token_ = request.session.get('token').id
    #tenant_id = request.user.tenant_id
    url_ = base.url_for(request, 'chargeback', 'publicURL')
    headers = {"X-Auth-Token": "%s" % token_, 'Accept': 'application/json'}

    try:
        r = requests.get("%sapi/account/current" % url_, headers=headers, verify=False)
        data =r.json()
        return data

    except:
        exceptions.handle(request, _('Unable to get the current account'))
        return []


def get_account_cycle(request, account_id):
    token_ = request.session.get('token').id
    #tenant_id = request.user.tenant_id
    url_ = base.url_for(request, 'chargeback', 'publicURL')
    headers = {"X-Auth-Token": "%s" % token_, 'Accept': 'application/json'}

    try:
        print "%sapi/account/%s/cycle" % (url_, account_id)
        r = requests.get("%sapi/account/%s/cycle" % (url_, account_id), headers=headers, verify=False)
        data = r.json()['cycles']
        return  data



    except:
        exceptions.handle(request, _('Unable to get cycles account'))
        return []

def get_projects_cycle(request, cycle_id):
    token_ = request.session.get('token').id
    #tenant_id = request.user.tenant_id
    url_ = base.url_for(request, 'chargeback', 'publicURL')
    headers = {"X-Auth-Token": "%s" % token_, 'Accept': 'application/json'}

    try:
        r = requests.get("%sapi/cycle/%s/project" % (url_, cycle_id), headers=headers, verify=False)
        data = r.json()['projects']
        return  data

    except:
        exceptions.handle(request, _('Unable to get cycles account'))
        return []

def get_products_project(request, project_id):
    token_ = request.session.get('token').id
    #tenant_id = request.user.tenant_id
    url_ = base.url_for(request, 'chargeback', 'publicURL')
    headers = {"X-Auth-Token": "%s" % token_, 'Accept': 'application/json'}

    try:
        r = requests.get("%sapi/project/%s/product" % (url_, project_id), headers=headers, verify=False)
        data = r.json()['products']
        return  data

    except:
        exceptions.handle(request, _('Unable to get products project'))
        return []
