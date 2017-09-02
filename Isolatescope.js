var myModule = angular.module('MyModule',[]);
myModule.directive('hello',function(){
  return{
    restrict: 'AE',
    scope: {},//angularJS的绑定策略，绑定独立scope
    template: '<div><input type="text" ng-model="userName"/>{{userName}}</div>',
    replace: true
  }
});