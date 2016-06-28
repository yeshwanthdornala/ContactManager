'use strict';

class NavbarController {
    constructor($scope, $state) {
      this.$scope = $scope;
      this.$state = $state;
    }
}

//end-non-standard

angular.module('contactmanagerApp')
  .controller('NavbarController', NavbarController);
