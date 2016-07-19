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
(function() {
  'use strict';
  angular
  .module('horizon.dashboard.chargeback.payments')
  .controller('horizon.dashboard.chargeback.PaymentsController', PaymentsController);

  PaymentsController.$inject = [
    'horizon.app.core.openstack-service-api.chargeback',
    'horizon.framework.util.i18n.gettext'];

  function PaymentsController (chargebackAPI, gettext){
    var ctrl = this;
    var account = {};
    var bag = {};
    ctrl.history = [];
    ctrl.config = {};
    ctrl.hasCredit = false;
    // ctrl.balance = 0;
    ctrl.showMessage = false;
    ctrl.warn = false;
    ctrl.message = "";
    ctrl.show_information = false;
    ctrl.loadData = loadData;

    function loadData(){
      chargebackAPI.getStatus()
      .then(function(data){
        bag = data.data.bag;
        _create_table(data.data);
        chargebackAPI.getCurrentAccount()
        .then(function(data){
          account = data.data.account;
          ctrl.hasCredit = account.allowCredit;
          // ctrl.balance = account.balance;
          // ctrl.status = account.status;
          ctrl.currency_name = account.currency.name;
          ctrl.remaining_balance = Number(account.balance) - Number(bag.usage);
          ctrl.consumption = Number(bag.usage);
          if(account.status === "CREATED"){
            ctrl.showMessage = true;
            ctrl.message = gettext('Make your first payment in order to get your account activated.');
          }
          else if (account.status === "SUSPENDED"){
            ctrl.showMessage = true;
            ctrl.warn = true;
            ctrl.message = gettext('Your account has been temporarily suspended. Please, contact the support team.');
          }
          ctrl.show_information = true;
        });
      });

    }
    /**
    @param {String} currency
    **/
    function _create_table_config(currency_name){
      var date = gettext('Date');
      var description = gettext('Description');
      var amount = gettext('Amount');
      var balance = gettext('Balance');
      var invoice = gettext('Invoice');
      return {
        selectAll: false,
        expand : false,
        trackId : 'id',
        columns : [{
          id: 'timestamp', title: date, sortDefault : true,
          template: "<span>{$ item.timestamp * 1000| date : 'yyyy-MM-dd' $}</span>"
        },{
          id: 'description', title: description
        },{
          id: 'amount', title : amount,
          template: "<span class=\"text-danger\" ng-if=item.type==='OUT'> - {$ item.amount |currency : '" +currency_name + "' $}</span>"+
          "<span class=\"text-success\" ng-if=item.type==='IN'>{$ item.amount |currency : '" +currency_name + "' $}</span>"
        },  {
          id: 'balance', title : balance,
          template: "<span>{$ item.balance | currency :  '"+ currency_name+ "'  $}</span>"
        },{
          id: 'invoice', title : invoice,
          template: '<a target="_blank" ng-href="{$ item.invoice $}">{$ item.invoice $}</a>'
        }]
      };
    }
    /**
    Records each item and sum the balance
    **/
    function _create_table(data){
      _generateBalanceValues(data.bag.history);
      ctrl.config = _create_table_config(data.bag.currency.name);
    }

    /**
    Used to update the currrent_balance of each history item.
    **/
    function _generateBalanceValues(history){
      ctrl.history = history;
      var balance = 0;
      var time = 0;

      ctrl.history.forEach(function(h){
        time += 1;
        h.timestamp += time;
        if(h.type === "OUT"){
          h.balance = balance - Number(h.amount);
          balance = balance - Number(h.amount);
        }
        else{
          h.balance = balance + Number(h.amount);
          balance = balance + Number(h.amount);
        }
      });
    }
  }
})();
