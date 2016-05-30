(function(){
  angular
  .module('horizon.dashboard.chargeback.mypanel')
  .directive('productResource', productResource);

  function productResource () {
    return {
      restrict: 'E',
      controllerAs : 'ctrl',
      bindToController : true,
      controller : ProductResourceController,
      scope : {
        resource : '=resource',
        currency : '=currency'
      },
      templateUrl : '/static/dashboard/widgets/productResource.directive.html'
    };
  }
  ProductResourceController.$inject = [];
  function ProductResourceController () {}
})();
