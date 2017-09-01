var myModule = angular.module('Mymodule',[]);
//注射器加载完所有模块时，此方法执行一次
myMdoule.run(function($templateCache){
  $templateCache.put('HelloAngular_Directive.html',"<div>hello every!</div>")
});

myModule.directive("hello",function(){
  return{
    restrict: 'AEMC',
    template: $templateCache.get("HelloAngular_Directive.html"),
    replace: true
  }
})