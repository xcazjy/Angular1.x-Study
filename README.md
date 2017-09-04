# angular 

- 特性1 MVC- model-view-controller
- 特性2 module 模块化和依赖注入 一切都是从模块开始的
- 特性3 指令系统
- 特性4 双向数据绑定

> 系统看到 ng-app 后，从这起归angular来管了，任意一个单页只能出现一次。

{{表示取值}}

# 前端开发环境

- 代码编辑工具sublime轻量级     webstorm
- 断点调试工具
- 版本管理工具git
- 代码合并和混淆工具 grunt 
- 依赖管理工具 bower
- 单元测试工具 nodejs
- 集成测试工具 karma jasmine angular-Protractor

# Contriller使用过程中的注意点

- 不要试图复用controller，一个控制器一般只负责一小块视图
- 不要在controller中操作dom，不是控制器的责任,会导致重汇或从新布局昂贵的解决方案-可以交给==director指令==
- 不要在controller里做格式化，ng有很好用的表单控件。
- 不要在controller里做数据过滤操作，ng有$filter服务。
- 一般来说，==controller是不会互相调用的==，控制器之间的交互会通过$scope/事件进行

==AngularJS的MVC是借助于$scope（作用域）实现的！==

> $rootScope是最顶层的作用域对象

# $scope

- $scope是一个POJO（Plain Old JavaScript Object）
- $scope提供一些工具方法$watch()/$apply()
- $scope是表达式的执行环境（或者叫作用域）
- $scope是一个树形结构，==与DOM标签平行==
- 子$scope上的对象会继承父$scope上的==属性和方法==
- 每一个Angular应用只有一个根$scope对象（一般位于ng-app上）
- $scope是可以传播事件，类似DOM事件，可以向上也可以向下
- $scope不仅是mvc的基础，也是实现双向数据绑定的基础
- 可以用angular.element($0).scope()进行调试，获得当前元素上的$scope

==*control+shift+k delete one line in sublime==

使用ng-bind来避免由于网速慢显示{{取值表达式}}内的内容影响用户体验，首页index加载页面使用

==*control+shift+d copy one line to dowm in sublime==

# 2.4路由
## Ajax缺点（需要前端路由的原因）
- Ajax不会在history留下历史记录
- 无法通过链接直接访问页面
- 无法通过SEO（搜索引擎优化Search Engine Optimization）索引

## 前端路由的基本原理
- 哈希#
- HTML5中新的history API
- 路由的核心是给我们的应用定义“状态”
- 路由机制会影响到整个编码的方式（需要预先定义好）
- 考虑兼容性问题与“优雅降级”

# 2.5指令(Derective)
## restrict-匹配模式
E | 元素 | `<my-menu title="Prducts"></my-menu> `
:--- | :--- | ---
A(默认) | 属性 | `<div my-menu=Products></div>` 
C | 样式类 | `<div class=my-menu:Products></div> `
M | 注释 | `<!-- directive:my-menu Products --> `
- 推荐使用元素和属性方式使用指令
- 当需要创建有自己的模版的指令时，使用元素名称的方式创建指令
- 当需要为自己的HTML标签增加功能时，使用属性的方式创建指令
## template
- template
- templateUrl
- templateCache 缓存起来在别处也能用
## replace & transclude
replace:true,替换内容

templace:<div>替换内容</div>

transclude:true,重要的配置项，嵌套不改变原有内容添加进去新内容

template:<div>新内容<div ng-transclude></div></div>

## compile & link
加载阶段 | 加载angular.js，找到ng-app相当于main(),确定应用的边界
--|--
编译阶段 | 遍历DOM，找到所有指令； - 根据指令代码中的template replace transclue转换DOM结构 - 如果存在compile函数则调用；（可以自定义compile调用自定义compile还要调用默认compile否则会被覆盖，所以一般不会自定义compile）
链接阶段 | 对每一条指令运行link函数；- link函数一般用来操作DOM、绑定事件监听器；

## 指令和控制器之间进行交互
link可监听鼠标滑过事件

```
link:function(scope,element,attr){
    element.bind('mouseenter',function(){
        scope.loadDate();
        scope.$apply('loadDate()');
        // attr.howtoload() 获取函数 
        // 注意之前函数用的驼峰法则写的，在这里调用要用小写
        scope.$apply(attr.howtoload);
        //调用函数，这里不要写函数调用形式，直接写属性
    })
}
```
==*注意之前函数用的驼峰法则写的，在这里调用要用小写==

#### link有四个属性(scope,element,attr),还有一个富控制器

==指令之间交互的方式是通过指令内部的controller暴露出来的方法来给外部进行调用==

```
myModule.directive("loader",function(){
    return{
        scope:{},
        // 创建独立的作用域
        restrict:'AE',
        controller:function($scope){
        // 这个controller和MVC里controller不是一个东西，指令内部暴露出一组pubulic方法给外部调用
            $scope.abilities = [];
            this.addStrength = function(){
                $scope.abilities.push('strength');
            };
            this.addSpeed = function(){
                $scope.abilities.push('speed');
            };
            this.addLight = function(){
                $scope.abilities.push('light');
            };
        },
        link:function(scope,element,attr){
            element.addClass('btn btn-ptimary');
            element.bind('mouseenter',function()
            // angular内置jquery-light简化版语法和jquery一样
            {
                console.log(scope.abilities);
            });
        }
    }
});
myModule.directive("speed".function(){
    return {
        require: '^superman',
        // require 表示speed依赖于Superman这个指令里，写了requeire后link函数就可以写第4个参数，angularJS进行处理的时候会把supermanCtrl自动注射到指令的link函数里面来，这样就可以调用到superman控制器里面暴露出的方法了。
        link: function(scope, element, attrs, supermanCtrl){
            supermnCtrl.addSpeed();
        }
    }
})

在html里：
<superman strength>力量</superman>
<superman strength speed>力量 速度</superman>
<superman strength speed light>力量 速度 发光</superman>
```
### 什么时候把逻辑写在controller里面，什么时候把逻辑写在link里面？
- 想要你的指令暴露出来一些方法供外部去调用就写在controller里面。
- link是用来处理指令内部的事物，如绑定事件、绑定数据。

# scope的绑定策略
@ | 把当前属性作为字符串传递。你还可以绑定来自外层scope的值，在属性之中插入{{}}即可。
--|--
= | 与父scope中的属性进行双向绑定
& | 传递一个来自父scope的函数，稍后调用

# AngularJS内置的指令
- a href为空时angular会做些处理，并不是html原生的
## form指令
- html原生的form表单是不能嵌套的，儿angular封装之后的form可以嵌套
- angular为form扩展了自动校验、防止重复提交等功能
- angular对input元素的type进行了扩展，一共提供了以下10种类型：text、==number、url、email==、radio、checkbox、hidden、button、submit、reset
- angular为表单内置了4种css样式：ng-valid、ng-invalid、ng-pristine、ng-dirty
- 内置校验器：require、minlength、maxlength

# 2.6 Service与Provider
内容简介
- 使用$http服务
- 创建自己的Service
- Service的特性
- Service、Factory、Provider本质上都是Provider
- 使用$filter服务
- 其它内置的Service介绍

## Service的特性
- Service都是==单例==的（在整个应用的框架里，只有一个实例）
- Service有$injector负责实例化（不用自己去new一个service去调用，直接声明就好angularJS会帮助实例化）
- Service在整个应用的生命周期中存在，可以用来==共享数据==
- 在需要使用的地方利用==依赖注入==机制诸如Service
- 自定义的Service需要写在内置的Service后面
- 内置Service的命名以$符号开头，自定义Service应该避免
## Service、Provider、Factory本质都是Provider
```
function provider(name, provider_){
    if(isFunction(provider_)){
        provider_ = providerInjector.instantiate(provider_);
    }
    if(!provider_.$get){
        throw Error('provider'+name+' must define $get factory method')
    }
    return providerCache[name + providerSuffix] = provider_;
}
```
- Serivce、Provider、Factory本质上都是Provider
- provider模式是“策略模式”+“抽象工厂模式”的混合体
## 使用$filter服务
- $filter是用来进行数据格式化的专用服务
- AngularJS内置9个filter：currency（货币¥、$）、date、filter、json、limitTo、lowercase、number（保留两位小数）、orderBy（排序）、uppercase
## 其他常用的Service：内置的24个(看文档)
- $compile：编译服务
- $filter: 数据格式化工具，内衣了8个
- $interval
- $timeout
- $locale 国际化
- $loacation 监控地址栏的变化的
- $log 日志
- $parse
- $http:封装了Ajax ==v1.5 中$http 的 success 和 error 方法已废弃。使用 then 方法替代。==
