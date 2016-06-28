'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
      this.contacts = [];

      this.toppings = [
        { name: 'Pepperoni', wanted: true },
        { name: 'Sausage', wanted: false },
        { name: 'Black Olives', wanted: true },
        { name: 'Green Peppers', wanted: false }
      ];

      console.log('get');
      this.$http.get('/api/contacts')
        .then(response => {
          this.contacts = response.data;
        });

    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    getContacts(){
      console.log('get contacts');
      this.$http.get('/api/contacts').then(function(res){
        console.log('contacts', res);
        contacts = res;
      });
    }

    createContact() {
      console.log('createContact clikced');
      var body = {
        firstName: "dummy",
        lastName: "knasd",
        phone: "7412589635",
        mobile: "8523697842",
        email: "yes@gmail.com"
      }
      this.$http.post('/api/contacts', body).then(function(res){
        console.log('success in main', res);
      });
    }
  }

  angular.module('contactmanagerApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: "main"
    });
})();
