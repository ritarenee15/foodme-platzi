"use strict";

foodMeApp.controller("ClosePanelController", function ($scope, cart) {
  $scope.cart = cart;
  $scope.isPanelHidden = false;

  $scope.closePanel = function () {
    $scope.isPanelHidden = true;
  };
});
