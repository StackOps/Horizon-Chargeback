var app = angular.module('horizon.dashboard.chargeback.mypanel');

app.directive('projectsTemplate', [ function(){
  return {
    restrict: 'E',
    controllerAs : 'projectCtrl',
    bindToController : true,
    controller : [function(){
      console.log("ver")
    }],
    transclude: true,
    scope : {
      project : '=project'
    },
    templateUrl : '/static/dashboard/widgets/projects.directive.html'
  }
}]);
