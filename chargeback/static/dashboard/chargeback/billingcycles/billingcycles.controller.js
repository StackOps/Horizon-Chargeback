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
    .module('horizon.dashboard.chargeback.billingcycles')
    .controller('horizon.dashboard.chargeback.myPluginController',
      BillingCyclesController)
    ;

  BillingCyclesController.$inject = [ '$http',
  'horizon.framework.widgets.modal-wait-spinner.service',
  'horizon.framework.widgets.toast.service',
  'horizon.app.core.openstack-service-api.chargeback',
  'horizon.app.core.openstack-service-api.roles'];

  function BillingCyclesController($http, WaitSpinnerService, toastService, chargebackAPI, rolesAPI) {
    var ctrl = this;
    ctrl.account = {};
    ctrl.accounts =[];
    ctrl.cycle_selected = null;
    ctrl.cycles = [];
    ctrl.hide_zero_value = true;
    ctrl.items = {};
    ctrl.loadAccount = loadAccount;
    ctrl.loadAccounts = loadAccounts;
    ctrl.loadCycles = loadCycles;
    ctrl.loadCurrentAccount = loadCurrentAccount;
    ctrl.loadProject = loadProject;
    ctrl.loadProduct = loadProduct;
    ctrl.products = [];
    ctrl.project_selected = null;
    ctrl.projects = [];
    ctrl.role_admin = false;

    getRoles();

    function getRoles(){
      rolesAPI.getRoles().then(function(data){
        var roles = {};
        data.data.forEach(function(role){
          roles[role.name] = true;
        });
        rolesAPI.updateRoles(roles);
        if(rolesAPI.hasRole('admin')){
          ctrl.role_admin = true;
          ctrl.loadAccounts();
        }
        else{
          ctrl.loadCurrentAccount();
        }
      });
    }

    function loadAccount(account_id){
      WaitSpinnerService.showModalSpinner('Loading');
      ctrl.loadCycles(account_id);
    }

    function loadAccounts(){
      chargebackAPI.getAccounts()
      .then(function(data){
        ctrl.accounts = data.data.accounts;
      });
    }

    function loadCycles(account_id){
      ctrl.cycles = [];
      ctrl.projects = [];
      ctrl.products = [];
      chargebackAPI.getCyclesAccount(account_id)
      .then(function(cycles){
        ctrl.cycles = cycles.data;
        WaitSpinnerService.hideModalSpinner();
      });
    }

    function loadCurrentAccount(){
      WaitSpinnerService.showModalSpinner('Loading');
      chargebackAPI.getCurrentAccount()
      .then(function(data){
        if(!data.data.account){
          toastService.add('error', data.data.message);
          WaitSpinnerService.hideModalSpinner();
        }
        else{
          ctrl.account = data.data.account;
          ctrl.currency = ctrl.account.currency;
          ctrl.loadCycles(ctrl.account.id);
        }
      });
    }

    function loadProduct(project){
      ctrl.project_selected = project;
      WaitSpinnerService.showModalSpinner('Loading');
      chargebackAPI.getProductsProject(project.id)
      .then(function(data){
        ctrl.products = data.data;
        WaitSpinnerService.hideModalSpinner();
      });
    }

    function loadProject(cycle){
      ctrl.projects = [];
      ctrl.products = [];
      ctrl.cycle_selected = cycle;
      WaitSpinnerService.showModalSpinner('Loading');
      chargebackAPI.getProjectsCycle(cycle.id).then(function(data){
        ctrl.projects = data.data;
        WaitSpinnerService.hideModalSpinner();
      });
    }
  }
})();
