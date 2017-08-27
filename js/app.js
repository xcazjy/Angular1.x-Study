var userInfoModule = angular.module('UserInfoModule',[]);
userInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
  $scope.userInfo = {
    email:'xcazjy@gmail.com',
    password:'12345678',
    autoLogin:true
  }
  $scope.getFormDate = function(){
    console.log($scope.userInfo); 
  }
  $scope.setFormDate = function(){
    $scope.userInfo = {
      email:'12895043@qq.com',
      password:'87654321',
      autoLogin:false
    }
  }
  $scope.resetForm= function(){
    $scope.userInfo={
      email:'xcazjy@gmail.com',
      password:'12345678',
      autoLogin:true
    }
  }
}]);