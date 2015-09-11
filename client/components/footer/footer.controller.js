'use strict';

angular.module('rstcApp')
  .controller('FooterCtrl', function ($scope, $location, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
  });
