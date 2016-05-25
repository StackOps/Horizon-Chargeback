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
    ctrl.items = [];
    chargebackAPI.getCurrentAccount().then(function(data){
      ctrl.items = data.data;
    });
    // ctrl.items = [
    //   { name: 'abc', id: 123 },
    //   { name: 'efg', id: 345 },
    //   { name: 'hij', id: 678 }
    // ];
  }
})();
