'use strict';

foodMeApp.controller('CheckoutController',
    function CheckoutController($scope, cart, customer, $location) {

  // Initialize scope variables
  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.customer = customer;
  $scope.submitting = false;

  // Function to check if the card number belongs to American Express
  function isAmericanExpress(cardNumber) {
    return /^(34|37)/.test(cardNumber);
  }

  // Function triggered when user attempts to make a purchase
  $scope.purchase = function() {
    // Prevent multiple submissions
    if ($scope.submitting) return;

    // Check if the card used is American Express and alert the user
    if (isAmericanExpress($scope.customer.cardNumber)) {
      alert('Sorry, we do not accept American Express. Please use another card');
      $scope.submitting = false;
      return;
    }

    // Mark the submission process as in progress
    $scope.submitting = true;

    // Submit the order and redirect to thank-you page upon successful submission
    cart.submitOrder().then(function(orderId) {
      $location.path('thank-you').search({orderId: orderId});
    });
  };
});
