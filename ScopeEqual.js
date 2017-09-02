var myModule = angular.module('MyModule',[]);
myModule.controller('MyCtrl',['$scope',function($scope){
  $scope.ctrlFlavor='可乐';
}]);
myModule.directive('drink',function(){
  return{
    restrict: 'AE',
     scope:{
       flavor:'='},  //=这种绑定，falavor绑定到CtrlFlavor
    template: '<input type="text" ng-model="flavor"/>'
  }
});