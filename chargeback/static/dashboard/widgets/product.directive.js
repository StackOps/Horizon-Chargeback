(function(){
  angular
  .module('horizon.dashboard.chargeback.mypanel')
  .directive('product', product);
  function product () {
    return {
      restrict: 'E',
      controllerAs : 'ctrl',
      bindToController : true,
      controller : ProductController,
      scope : {
        product : '=product',
        currency : '=currency'
      },
      templateUrl : '/static/dashboard/widgets/product.directive.html'
    };
  }
  ProductController.$inject = [];
  function ProductController () {}

})();
