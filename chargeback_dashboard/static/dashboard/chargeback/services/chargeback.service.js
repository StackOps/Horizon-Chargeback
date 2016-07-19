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
(function () {
  'use strict';

  angular
    .module('horizon.dashboard.chargeback')
    .factory('horizon.app.core.openstack-service-api.chargeback', chargebackAPI);

  chargebackAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  /**
   * @ngdoc service
   * @name neutronAPI
   * @param {Object} apiService
   * @param {Object} toastService
   * @description Provides access to Neutron APIs.
   * @returns {Object} The service
   */
  function chargebackAPI(apiService, toastService) {
    var service = {
      getAccounts : getAccounts,
      getStatus : getStatus,
      getCurrentAccount : getCurrentAccount,
      getCyclesAccount : getCyclesAccount,
      getProjectsCycle : getProjectsCycle,
      getProductsProject : getProductsProject
    };
    return service;


    function getAccounts(){
      return apiService.get('/api/account')
      .error(function(){
        toastService.add('error', 'Unable to retrieve the account list.');
      });
    }

    function getCurrentAccount() {
      return apiService.get('/api/account/current')
        .error(function () {
          toastService.add('error', 'Unable to retrieve the current account.');
        });
    }

    function getCyclesAccount(account_id){
      return apiService.get('/api/account/'+ account_id + '/cycle')
      .error(function(){
        toastService.add('error', 'Unable to retrieve the cycles for the account ' + account_id + '.');
      });
    }

    function getProductsProject(project_id){
      return apiService.get('/api/project/'+ project_id + '/product')
      .error(function(){
        toastService.add('error', 'Unable to retrieve the products for the project ' + project_id + '.');
      });
    }

    function getProjectsCycle(cycle_id){
      return apiService.get('/api/cycle/'+ cycle_id + '/project')
      .error(function(){
        toastService.add('error', 'Unable to retrieve the project for the cycle ' + cycle_id + '.');
      });
    }

    function getStatus(){
      return apiService.get('/api/account/status')
      .error(function(){
        toastService.add('error', 'Unabled to retrueve the status of the current account.');
      });
    }
  }

}());
