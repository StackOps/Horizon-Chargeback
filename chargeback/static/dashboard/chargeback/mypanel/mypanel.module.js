(function() {
  'use strict';

  angular
    .module('horizon.dashboard.chargeback.mypanel', [])
    .controller('horizon.dashboard.chargeback.myPluginController',
      myPluginController)
    ;

  myPluginController.$inject = [ '$http', 'horizon.app.core.openstack-service-api.chargeback'];

  function myPluginController($http, chargebackAPI) {
    var ctrl = this;
    ctrl.items = {};
    ctrl.cycles = [];
    ctrl.projects = [];


    chargebackAPI.getCurrentAccount().then(function(data){
      ctrl.account = data.data.account;
      chargebackAPI.getCyclesAccount(ctrl.account.id).then(function(cycles){
        ctrl.cycles = cycles.data;
      });
    });

    ctrl.loadProject = function(cycle){
      chargebackAPI.getProjectsCycle(cycle.id).then(function(data){
        ctrl.projects = data.data;
      });
    };

    ctrl.loadProduct = function(project){
      chargebackAPI.getProductsProject(project.id)
      .then(function(data){
        ctrl.products = data.data;
      });
    };



  }
})();
