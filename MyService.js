var myServiceApp = angular.module('MyServiceApp',[]);

myServiceApp.factory('userListService',['$http',
  function($http){
    var doRequest = function(username, path){
      return $http({
        method: 'GET',
        url: 'json/users.json'
      });
    }
    return{
      userList: function(username){
        return doRequest(username, 'userList');
      }
    };
  }
]);

// myServiceApp.controller('ServiceController',['$scope','$timeout','userListService',
//   function($scope, $timeout, userListService){
//     var timeout;

//     $scope.$watch('username', function(newUserName){
//       if(newUserName){
//         if(timeout){
//           $timeout.cancel(timeout);
//         }
//         timeout = $timeout(function(){
//           userListService.userList(newUserName)
//             .success(function(data, status){   //v1.5 中$http 的 success 和 error 方法已废弃。使用 then 方法替代。
//               $scope.users = data;
//             });
//         }, 350);
//       }
//     });
//   }
// ]);

myServiceApp.controller('ServiceController', ['$scope', '$timeout', 'userListService',
    function($scope, $timeout, userListService) {
        var timeout;
        $scope.$watch('username', function(newUserName) {
            if (newUserName) {
                if (timeout) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(function() {
                    userListService.userList(newUserName)
                        .then(function(data, status) {
                            $scope.users = data;
                        });
                }, 350);
            }
        });
    }
]);