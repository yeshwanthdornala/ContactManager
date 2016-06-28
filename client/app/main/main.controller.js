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
      this.$rootScope =$rootScope;

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
        templateUrl: 'app/contact/contactDialog.html',
       //  parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: true
      })
      .then(function(answer) {
       //  this.$scope.status = 'You said the information was "' + answer + '".';
      }, function() {
       //  this.$scope.status = 'You cancelled the dialog.';
      });

    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });
    }

    addThing() {
      console.log('add things');
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }


    toContact() {
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'))  && this.$scope.customFullscreen;
         this.$mdDialog.show({
           controller: 'dialogController',
           templateUrl: 'app/contact/contactDialog.html',
          //  parent: angular.element(document.body),
           clickOutsideToClose:true,
           fullscreen: true
         })
         .then(function(answer) {
          //  this.$scope.status = 'You said the information was "' + answer + '".';
         }, function() {
           console.log($rootScope.isEdit);
           $rootScope.isEdit = false;
          //  this.$scope.status = 'You cancelled the dialog.';
         });
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    getContacts(){
      this.$http.get('/api/contacts').then(function(res){
        console.log('contacts', res);
        contacts = res;
      });
    }
  }

  angular.module('contactmanagerApp')
    .controller('dialogController',['$scope', '$mdDialog', '$http', '$state', '$rootScope', function($scope, $mdDialog, $http, $state, $rootScope){
      $scope.contact = {};
      console.log($rootScope.isEdit);

      if ($rootScope.isEdit) {
        $scope.contact = $rootScope.contact;
      }

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.deleteContact = function(){
        $http.delete('/api/contacts/' + $scope.contact._id,).then(response => {
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
