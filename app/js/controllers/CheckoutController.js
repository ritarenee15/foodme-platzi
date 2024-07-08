'use strict';

foodMeApp.controller('CheckoutController',
    function CheckoutController($scope, cart, customer, $location, alert) {

  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.customer = customer;
  $scope.submitting = false;


  $scope.purchase = function() {
    let value = cart.payment.number;

    // Remove all non-numeric characters
    value = value.replace(/\D/g, '');

    // Check if the value matches American Express pattern (34 or 37 and 15 digits)
    if (/^3[47]\d{13}$/.test(value) || cart.payment.type === "amex") {
      // If it's an American Express card, clear the input field or show an error message
      $scope.submitting = true;
      alert('We are experimenting temporal problems accepting amex card for payment. Please use a diferent method.');
      
    }

    if ($scope.submitting) {
      $scope.submitting = false;
      $scope.cart.payment.number = value.slice(0, -1);
      return
    };

    $scope.submitting = true;
    cart.submitOrder().then(function(orderId) {
      $location.path('thank-you').search({orderId: orderId});
    });
  };
});
