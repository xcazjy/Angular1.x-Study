var myModule = angular.module('MyModule',[]);
myModule.filter('myfilter',function(){
  return function(ite){
    return ite + '';
  }
})