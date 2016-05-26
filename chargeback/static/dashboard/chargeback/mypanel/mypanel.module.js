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
    // chargebackAPI.getCurrentAccount().then(function(data){
    //   console.log(data)
    //   ctrl.account = data.data.account
    //   ctrl.items = data.data;
    // });

    var call_ = function(){
      chargebackAPI.getCurrentAccount().then(function(data){
        ctrl.account = data.data.account
        chargebackAPI.getCyclesAccount(ctrl.account.id).then(function(cycles){
          ctrl.cycles = cycles.data
        });
      });
    };

    call_()



    // ctrl.items = [
    //   { name: 'abc', id: 123 },
    //   { name: 'efg', id: 345 },
    //   { name: 'hij', id: 678 }
    // ];
  }
})();
