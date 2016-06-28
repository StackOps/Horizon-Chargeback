/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
(function(){
  'use strict';

  angular
  .module('horizon.dashboard.chargeback')
  .directive('cbkBalance', cbkBalance);

  function cbkBalance () {
    return {
      restrict: 'E',
      controllerAs : 'balanceCtrl',
      bindToController : true,
      controller : CbkBalanceController,
      link : link,
      scope : {
        amount : '=amount',
        currency_name : '=currencyname'
      },
      templateUrl : '/static/dashboard/widgets/cbkBalance.directive.html'
    };
  }
  CbkBalanceController.$inject = [];
  function CbkBalanceController () {
    this.less_than_zero = this.amount < 0;
    this.tooltip = gettext("The remaining balance is the result of substraiting the monthly consumption from the balance.");
  }
})();
