var myModule = angular.module('MyModule',[]);

myModule.controller('MyCtrl',['$scope',function($scope){
  $scope.loadDate =  function(){
    console.log('load...');
  }
}]);

myModule.controller('MyCtrl2',['$scope',function($scope){
  $scope.loadDate2 =  function(){
    console.log('load2...');
  }
}]);

myModule.directive('loader',function(){
  return{
    restrict:'AE',
    link:function(scope,element,attr){
      element.bind('mouseenter',function(){
        // scope.loadDate();
        // scope.$apply("loadDate()");
        // attr.howtoload() 获取函数
        // 注意之前函数用的驼峰法则写的，在这里调用要用小写，
        scope.$apply(attr.howtoload); //调用函数，这里不要写函数调用形式，直接写属性
      });
    }
  }
})