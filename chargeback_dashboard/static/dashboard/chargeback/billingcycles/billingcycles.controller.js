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

  BillingCyclesController.$inject = [
  'horizon.framework.widgets.toast.service',
  'horizon.app.core.openstack-service-api.chargeback',
  'horizon.app.core.openstack-service-api.roles'];

  function BillingCyclesController( toastService, chargebackAPI, rolesAPI) {
    var ctrl = this;
    ctrl.account = {};
    ctrl.accounts =[];
    ctrl.cycle_selected = null;
    ctrl.cycles = [];
    ctrl.hide_zero_value = true;
    ctrl.products = [];
    ctrl.project_selected = null;
    ctrl.projects = [];
    ctrl.role_admin = false;
    ctrl.show_information = false;
    ctrl.has_cycles_to_load = false;
    ctrl.has_projects_to_load = false;
    ctrl.has_products_to_load = false;

    ctrl.getRoles = getRoles;
    ctrl.loadAccount = loadAccount;
    ctrl.loadProject = loadProject;
    ctrl.loadProduct = loadProduct;


    function getRoles(){
      rolesAPI.getRoles().then(function(data){
        var roles = {};
        data.data.forEach(function(role){
          roles[role.name] = true;
        });
        rolesAPI.updateRoles(roles);
        if(rolesAPI.hasRole('admin')){
          ctrl.role_admin = true;
          _loadAccounts();
        }
        else{
          ctrl.has_cycles_to_load = true;
          _loadCurrentAccount();
        }
      });
    }

    function loadAccount(account_id){
      _loadCycles(account_id);
    }

    function _loadAccounts(){
      chargebackAPI.getAccounts()
      .then(function(data){
        ctrl.accounts = data.data.accounts;
        ctrl.show_information = true;
      });
    }

    function loadProduct(project){
      ctrl.project_selected = project;
      ctrl.has_products_to_load = true;
      chargebackAPI.getProductsProject(project.id)
      .then(function(data){
        ctrl.products = data.data;
        ctrl.has_products_to_load = false;
      });
    }

    function loadProject(cycle){
      ctrl.projects = [];
      ctrl.products = [];
      ctrl.cycle_selected = cycle;
      ctrl.has_projects_to_load = true;
      chargebackAPI.getProjectsCycle(cycle.id)
      .then(function(data){
        ctrl.projects = data.data;
        ctrl.has_projects_to_load = false;
      });
    }

    function _loadCycles(account_id){
      ctrl.has_cycles_to_load = true;
      ctrl.cycles = [];
      ctrl.projects = [];
      ctrl.products = [];
      chargebackAPI.getCyclesAccount(account_id)
      .then(function(cycles){
        ctrl.show_information = true;
        ctrl.cycles = cycles.data;
        ctrl.has_cycles_to_load = false;
      });
    }

    function _loadCurrentAccount(){
      chargebackAPI.getCurrentAccount()
      .then(function(data){
        if(!data.data.account){
          toastService.add('error', data.data.message);
        }
        else{
          ctrl.account = data.data.account;
          ctrl.currency = ctrl.account.currency;
          _loadCycles(ctrl.account.id);
        }
      });
    }
  }
})();
