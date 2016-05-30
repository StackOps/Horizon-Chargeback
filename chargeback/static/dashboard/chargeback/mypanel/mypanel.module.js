(function() {
  'use strict';

  angular
    .module('horizon.dashboard.chargeback.mypanel', [])
    .controller('horizon.dashboard.chargeback.myPluginController',
      MyPluginController)
    ;

  MyPluginController.$inject = [ '$http', 'horizon.app.core.openstack-service-api.chargeback'];

  function MyPluginController($http, chargebackAPI) {
    var ctrl = this;
    ctrl.items = {};
    ctrl.cycles = [];
    ctrl.projects = [];
    ctrl.products = [];
    ctrl.cycle_selected = null;
    ctrl.project_selected = null;


    chargebackAPI.getCurrentAccount().then(function(data){
      ctrl.account = data.data.account;
      ctrl.currency = ctrl.account.currency;
      chargebackAPI.getCyclesAccount(ctrl.account.id).then(function(cycles){
        ctrl.cycles = cycles.data;
      });
    });

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
