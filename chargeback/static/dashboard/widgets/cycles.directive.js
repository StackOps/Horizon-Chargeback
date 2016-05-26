var app = angular.module('horizon.dashboard.chargeback.mypanel');

app.directive('cyclesTemplate', [ function(){
  return {
    restrict: 'E',
    controllerAs : 'cycles',
    bindToController : true,
    controller : [function(){
      console.log("entra aqui")
    }],
    transclude: true,
    scope : {
      cycle : '=cycle'
    },
    templateUrl : '/static/dashboard/widgets/cycles.directive.html'
  }
}]);
