'use strict';

angular.module('rstcApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.tabs = [
      {'title' : 'Students', 'link': '/students'},
      {'title' : 'Attendance', 'link': '/attendance'},
      {'title' : 'Questions', 'link': '/questions'},
      {'title' : 'Tests', 'link': '/tests'},
      {'title' : 'Fees', 'link': '/fees'},
    ];

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
