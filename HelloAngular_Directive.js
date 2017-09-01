var myModule = angular.module("MyModule",[]);
myModule.directive("hello",function(){
  return{
    restrict:'AEMC', //匹配模式AEMC默认使用A
    template: '<div>Hello everyone!<div ng-transclude></div></div>',
    // replace:true
    transclude: true
  }
})