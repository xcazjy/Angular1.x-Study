var myModule = angular.module('MyModule',[]);
myModule.controller('MyCtrl',['$scope',function($scope){
  $scope.ctrlFlavor='可乐';
}]);
myModule.directive('drink',function(){
  return{
    restrict: 'AE',
     scope:{
       flavor:'@'},  //@绑定传递的是字符串而不是对象
    template: '<div>{{flavor}}</div>'
    // ,
    // link:function(scope, attr, element){
    //   scope.flavor = attr.flavor;
    // }
  }
});