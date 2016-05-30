(function(){
  'use strict';

  angular
  .module('horizon.dashboard.chargeback.mypanel')
  .directive('cycle', cycle);

  function cycle () {
    return {
      restrict: 'E',
      controllerAs : 'ctrl',
      bindToController : true,
      controller : CycleController,
      scope : {
        cycle : '=cycle',
        currency : '=currency'
      },
      templateUrl : '/static/dashboard/widgets/cycle.directive.html'
    };
  }

  CycleController.$inject = [];
  function CycleController () {}
})();
