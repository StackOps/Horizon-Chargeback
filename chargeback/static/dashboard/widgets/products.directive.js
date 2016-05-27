var app = angular.module('horizon.dashboard.chargeback.mypanel');

app.directive('productsTemplate', [ function(){
  return {
    restrict: 'E',
    controllerAs : 'productCtrl',
    bindToController : true,
    controller : [function(){
      console.log("ver")
    }],
    transclude: true,
    scope : {
      product : '=product'
    },
    templateUrl : '/static/dashboard/widgets/products.directive.html'
  }
}]);
