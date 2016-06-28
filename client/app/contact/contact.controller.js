'use strict';

(function() {

  class ContactController {
    constructor($http) {
      this.$http = $http;
      console.log('contact ctrl');
    }
  }

  angular.module('contactmanagerApp')
    .component('contact', {
      templateUrl: 'app/contact/contact.html',
      controller: ContactController,
      controllerAs: "contact"
    });
})();
