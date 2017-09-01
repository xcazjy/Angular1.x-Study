var myModule = angular.module('MyModule',[]);
myModule.controller('commoncontroller',['$scope',function($scope){
  $scope.greenting ={
    text:'Hello'
  }
  $scope.commonFn = function(){
    console.log('common')
  }
}]);

myModule.controller('controller1',['$scope',function($scope){
  $scope.test1 = function(){
    console.log('test1')
  }
}]);

myModule.controller('controller2',['$scope',function($scope){
  $scope.test2 = function(){
    console.log('test2')
  }
}]);