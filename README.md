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

==^control+shift+k delete one line in sublime==

使用ng-bind来避免由于网速慢显示{{取值表达式}}内的内容影响用户体验，首页index加载页面使用

==^control+shift+d copy one line to dowm in sublime==

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
E | 元素 | <my-menu title="Prducts"></my-menu>
---|---|---
A(默认) | 属性 | <div my-menu=Products></div>
C | 样式类 | <div class=my-menu:Products></div>
M | 注释 | <!-- directive:my-menu Products -->
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

# compile & link
加载阶段 | 加载angular.js，找到ng-app相当于main(),确定应用的边界
--|--
编译阶段 | - 遍历DOM，找到所有指令； - 根据指令代码中的template replace transclue转换DOM结构 - 如果存在compile函数则调用；（可以自定义compile调用自定义compile还要调用默认compile否则会被覆盖，所以一般不会自定义compile）
链接阶段 | - 对每一条指令运行link函数；- link函数一般用来操作DOM、绑定事件监听器；

## 指令和控制器之间进行交互