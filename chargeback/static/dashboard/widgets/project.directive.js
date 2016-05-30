(function(){
  angular
  .module('horizon.dashboard.chargeback.mypanel')
  .directive('project', project);

  function project () {
    return {
      restrict: 'E',
      controllerAs : 'ctrl',
      bindToController : true,
      controller : ProjectController,
      scope : {
        project : '=project',
        currency : '=currency'
      },
      templateUrl : '/static/dashboard/widgets/project.directive.html'
    };
  }
  ProjectController.$inject = [];
  function ProjectController () {}
})();
