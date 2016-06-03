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
    .module('horizon.dashboard.chargeback.payments', [])
    .controller('horizon.dashboard.chargeback.paymentscontroller',
      PaymentsController)
    ;

  PaymentsController.$inject = [ '$http',
  '$modal',
  'horizon.framework.widgets.toast.service',
  'horizon.app.core.openstack-service-api.chargeback',
  'horizon.app.core.openstack-service-api.roles'];

  function PaymentsController($http, $modal, toastService, chargebackAPI, rolesAPI) {
    var ctrl = this;
    ctrl.account = {};
    ctrl.items = {};
    ctrl.cycles = [];
    ctrl.projects = [];
    ctrl.products = [];
    ctrl.cycle_selected = null;
    ctrl.project_selected = null;
    ctrl.hide_zero_value = true;
    ctrl.role_admin = false;
    ctrl.accounts =[];


  }
})();
