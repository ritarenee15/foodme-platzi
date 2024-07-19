"use strict";

foodMeApp.controller(
  "CheckoutController",
  function CheckoutController($scope, cart, customer, $location) {
    $scope.cart = cart;
    $scope.restaurantId = cart.restaurant.id;
    $scope.customer = customer;
    $scope.submitting = false;

    $scope.purchase = function () {
      if ($scope.submitting) return;

      $scope.submitting = true;
      cart.submitOrder().then(function (orderId) {
        $location.path("thank-you").search({ orderId: orderId });
      });
    };

    $scope.isCardNumberValid = function (number) {
      if (!number) return true;
      var amexPattern = /^(34|37)/;
      return !amexPattern.test(number) && number.length === 16;
    };

    $scope.formatExpirationDate = function () {
      if (!$scope.cart.payment.expire) return;

      var input = $scope.cart.payment.expire.replace(/\D/g, "");

      if (input.length > 2) {
        input = input.substring(0, 2) + "/" + input.substring(2, 6);
      }

      $scope.cart.payment.expire = input;
    };
  }
);
