/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(){
  'use strict';

  describe('Service: chargebackAPI', function () {
    beforeEach(module('horizon.dashboard.chargeback'));

    // instantiate service
    var chargebackAPI;
    var accounts;
    var apiService;
    var toastService;
    var $q;
    var messages;
    var current_path;
    var accountId = 4;
    var projectId = 3;
    var cycleId = 2;

    var tests = [{
      "func": "getAccounts",
      "method": "get",
      "path": "/api/account",
      "error": 'Unable to retrieve the account list.'
    }, {
      "func": "getStatus",
      "method": "get",
      "path": '/api/account/status',
      "error": 'Unabled to retrueve the status of the current account.'
    }, {
      "func": "getCurrentAccount",
      "method": "get",
      "path": '/api/account/current',
      "error": 'Unable to retrieve the current account.'
    }, {
      "func": "getProjectsCycle",
      "method": "get",
      "path": '/api/cycle/'+ cycleId + '/project',
      "error": 'Unable to retrieve the project for the cycle ' + cycleId + '.',
      "testInput": [
          cycleId
        ]
    }, {
      "func": "getProductsProject",
      "method": "get",
      "path": '/api/project/'+ projectId + '/product',
      "error": 'Unable to retrieve the products for the project ' + projectId + '.',
      "testInput": [
          projectId
        ]
    }, {
      "func": "getCyclesAccount",
      "method": "get",
      "path": '/api/account/' + accountId + '/cycle',
      "error": 'Unable to retrieve the cycles for the account ' + accountId + '.',
      "testInput": [
          accountId
        ]
    }];
    beforeEach(module(function($provide){
      apiService = {
        get : function(value){
          current_path = value; // this is used to check the path
          return {
            error : function(fn){
              fn();
            }
          };
        }
      };
      toastService = {
        add : function(type, message){
          messages =  message; // used to check the error message
        }
      };
      $provide.value('horizon.framework.util.http.service', apiService);
      $provide.value('horizon.framework.widgets.toast.service', toastService);
    }));

    beforeEach(inject(function ($rootScope, $injector) {
      chargebackAPI = $injector.get('horizon.app.core.openstack-service-api.chargeback', {
        // 'horizon.framework.util.http.service' : apiService,
        // 'horizon.framework.widgets.toast.service' : toastService
      });
    }));

    // Iterate through the defined tests and apply as Jasmine specs.
    angular.forEach(tests, function(params) {
      it('defines the ' + params.func + ' call properly', function() {
        // var callParams = [apiService, service, toastService, params];
        chargebackAPI[params.func].apply(this, params.testInput);
        expect(messages).toEqual(params.error);
        expect(current_path).toEqual(params.path);
      });
    });
  });
}());
