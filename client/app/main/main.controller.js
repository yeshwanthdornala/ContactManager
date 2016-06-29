'use strict';

(function() {

  class MainController {
    constructor($http, $scope, $state, $mdMedia, $mdDialog, $rootScope) {
      this.$http = $http;
      this.$state = $state;
      this.$scope = $scope;
      this.awesomeThings = [];
      this.contacts = [];
      this.$mdMedia = $mdMedia;
      this.$mdDialog = $mdDialog;
      this.$rootScope = $rootScope;

      this.$http.get('/api/contacts')
        .then(response => {
          this.contacts = response.data;
        });
    }

    editContact(contact) {
      this.$rootScope.isEdit = true;
      this.$rootScope.contact = contact;

      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'))  && this.$scope.customFullscreen;
      this.$mdDialog.show({
        controller: 'dialogController',
        templateUrl: 'app/main/contactDialog.html',
       //  parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
      .then(function(answer) {
       //  this.$scope.status = 'You said the information was "' + answer + '".';
      }, function() {
       //  this.$scope.status = 'You cancelled the dialog.';
      });

    }

    toContact() {
      this.$rootScope.isEdit = false;
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'))  && this.$scope.customFullscreen;
         this.$mdDialog.show({
           controller: 'dialogController',
           templateUrl: 'app/main/contactDialog.html',
          //  parent: angular.element(document.body),
           clickOutsideToClose:true,
           fullscreen: useFullScreen
         })
         .then(function(answer) {
          //  this.$scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          console.log(this.$rootScope);
           this.$rootScope.isEdit = false;
          //  this.$scope.status = 'You cancelled the dialog.';
         });
    }
  }

  angular.module('contactmanagerApp')
    .controller('dialogController',['$scope', '$mdDialog', '$http', '$state', '$rootScope', function($scope, $mdDialog, $http, $state, $rootScope){
      $scope.contact = {};

      if ($rootScope.isEdit) {
        $scope.contact = $rootScope.contact;
      }

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.deleteContact = function(){
        $http.delete('/api/contacts/' + $scope.contact._id).then(response => {
          $rootScope.isEdit = false;
          $state.reload();
          $scope.cancel();
        });
      }

      $scope.saveContact = function() {
        if ($rootScope.isEdit) {
          $http.put('/api/contacts/' + $scope.contact._id, $scope.contact).then(response => {
            $state.reload();
            $scope.cancel();
          });
        }else{
          $http.post('/api/contacts', $scope.contact).then(response => {
            $state.reload();
            $scope.cancel();
          });
        }
      };

    }]);


  angular.module('contactmanagerApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: "main"
    });
})();
