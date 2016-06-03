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
    ctrl.bag = {};

    ctrl.loadData = function(){
      chargebackAPI.getStatus().then(function(data){
        console.log(data);
        ctrl.bag = data.data.bag;
        ctrl.history = ctrl.bag.history;
        ctrl.currency = ctrl.bag.currency;

      });
    };
    ctrl.fakeData = [];

    ctrl.items = [];
    ctrl.config = {
      selectAll: true,
      expand : true,
      trackId : 'id',
      columns : [{
        id: 'amount', title : 'Amount'
      },{
        id: 'description', title: 'Description'
      },{
        id: 'invoice', title : 'Invoice'
      }, {
        id: 'timestamp', title: 'Date', sortDefault : true
      }]
    };

    ctrl.loadData();
  }
})();
