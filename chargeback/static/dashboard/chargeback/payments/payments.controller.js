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
(function() {
  'use strict';
  angular
  .module('horizon.dashboard.chargeback.payments')
  .controller('horizon.dashboard.chargeback.PaymentsController', PaymentsController);

  PaymentsController.$inject = ['horizon.app.core.openstack-service-api.chargeback'];

  function PaymentsController (chargebackAPI){
    var ctrl = this;
    ctrl.history = [];
    ctrl.config = {};
    ctrl.fakeTableData = [];

    ctrl.loadData = function(){
      chargebackAPI.getStatus().then(function(data){
        create_table(data.data);
      });
    };


    var create_table = function(data){
      var bag = data.bag;
      ctrl.history = bag.history;
      var currency_name = bag.currency.name;
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

      ctrl.config = {
        selectAll: false,
        expand : false,
        trackId : 'id',
        columns : [{
          id: 'timestamp', title: 'Date', sortDefault : true,
          template: "<span>{$ item.timestamp * 1000| date : 'yyyy-MM-dd' $}</span>"
        },{
          id: 'description', title: 'Description'
        },{
          id: 'amount', title : 'Amount',
          template: "<span class=\"text-danger\" ng-if=item.type==='OUT'> - {$ item.amount |currency : '" +currency_name + "' $}</span>"+
          "<span class=\"text-success\" ng-if=item.type==='IN'>{$ item.amount |currency : '" +currency_name + "' $}</span>"
        },  {
          id: 'balance', title : 'Balance',
          template: "<span>{$ item.balance | currency :  '"+ currency_name+ "'  $}</span>"
        },{
          id: 'invoice', title : 'Invoice',
          template: '<a target="_blank" ng-href="{$ item.invoice $}">{$ item.invoice $}</a>'
        }]
      };
      // var div = $element;
      // var child = $compile('<hz-dynamic-table config="ctrl.config" items="ctrl.fakeTableData" safe-src-items="ctrl.history">'+
      // ' </hz-dynamic-table>')($scope);
      // div.append(child);

    };

    ctrl.loadData();
  }
})();
