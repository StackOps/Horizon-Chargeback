# Copyright 2015 IBM Corp.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""API over the cinder service.
"""

from django.views import generic

# from openstack_dashboard import api
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils
from openstack_dashboard.api import base
from openstack_dashboard.dashboards.chargeback.api import api

#CLIENT_KEYWORDS = {'marker', 'sort_dir', 'paginate'}


@urls.register
class CurrentAccount(generic.View):
    """API for currentAccount

    http://developer.openstack.org/api-ref-networking-v2.html
    """
    url_regex = r'account/current$'

    @rest_utils.ajax()
    def get(self, request):
        """Get the account for the current user

        The listing result is an object with property "items".  Each item is
        a network.
        """
        return api.chargeback.get_current_account(request)


@urls.register
class Accounts(generic.View):
    """API for currentAccount

    http://developer.openstack.org/api-ref-networking-v2.html
    """
    url_regex = r'account$'

    @rest_utils.ajax()
    def get(self, request):
        """Get the list of accounts

        The listing result is an object with property "items".  Each item is
        a network.
        """
        return api.chargeback.get_all_accounts(request)


@urls.register
class Cycles(generic.View):
    '''API for cycles
    '''
    url_regex = r'account/(?P<account_id>[^/]+)/cycle$'

    @rest_utils.ajax()
    def get(self, request, account_id):
        return api.chargeback.get_account_cycle(request, account_id)


@urls.register
class Projects(generic.View):
    '''API for cycles
    '''
    url_regex = r'cycle/(?P<cycle_id>[^/]+)/project$'

    @rest_utils.ajax()
    def get(self, request, cycle_id):
        return api.chargeback.get_projects_cycle(request, cycle_id)


@urls.register
class Projects(generic.View):
    '''API for cycles
    '''
    url_regex = r'project/(?P<project_id>[^/]+)/product$'

    @rest_utils.ajax()
    def get(self, request, project_id):
        return api.chargeback.get_products_project(request, project_id)




@urls.register
class Status(generic.View):
    '''API for cycles
    '''
    url_regex = r'account/status$'

    @rest_utils.ajax()
    def get(self, request):
        return api.chargeback.get_status_account(request)
