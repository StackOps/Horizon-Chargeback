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
    .module('horizon.dashboard.chargeback.billingcycles', [])
    .controller('horizon.dashboard.chargeback.myPluginController',
      BillingCyclesController)
    ;

  BillingCyclesController.$inject = [ '$http',
  'horizon.app.core.openstack-service-api.chargeback',
  'horizon.app.core.openstack-service-api.roles'];

  function BillingCyclesController($http, chargebackAPI, rolesAPI) {
    var ctrl = this;
    ctrl.items = {};
    ctrl.cycles = [];
    ctrl.projects = [];
    ctrl.products = [];
    ctrl.cycle_selected = null;
    ctrl.project_selected = null;
    ctrl.hide_zero_value = true;
    ctrl.role_admin = false;
    ctrl.accounts =[];



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

    ctrl.loadCurrentAccount = function(){
      chargebackAPI.getCurrentAccount()
      .then(function(data){
        ctrl.account = data.data.account;
        ctrl.currency = ctrl.account.currency;
        ctrl.loadCycles(ctrl.account.id);
      });
    };

    ctrl.loadCycles = function(account_id){
      ctrl.cycles = [];
      ctrl.projects = [];
      ctrl.products = [];
      chargebackAPI.getCyclesAccount(account_id)
      .then(function(cycles){
        ctrl.cycles = cycles.data;
      });
    };

    ctrl.loadAccounts = function(){
      chargebackAPI.getAccounts()
      .then(function(data){
        ctrl.accounts = data.data.accounts;
      });
    };


    ctrl.loadProject = function(cycle){
      ctrl.projects = [];
      ctrl.products = [];
      ctrl.cycle_selected = cycle;
      chargebackAPI.getProjectsCycle(cycle.id).then(function(data){
        ctrl.projects = data.data;
      });
    };
    ctrl.loadProduct = function(project){
      ctrl.project_selected = project;
      chargebackAPI.getProductsProject(project.id)
      .then(function(data){
        ctrl.products = data.data;
      });
    };
  }
})();
