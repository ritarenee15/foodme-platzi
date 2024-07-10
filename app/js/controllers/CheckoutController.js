'use strict';

foodMeApp.controller('CheckoutController',
    function CheckoutController($scope, cart, customer, $location) {

  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.customer = customer;
  $scope.submitting = false;


  $scope.purchase = function() {
    if ($scope.submitting) return;

    // Check if the credit card type is allowed
    var cardNumber = $scope.cart.payment.number;
    if (!(cardNumber.startsWith('4') || cardNumber.startsWith('5') || cardNumber.startsWith('6'))) {
      alert('Only Visa, MasterCard, and Discover cards are accepted. Please use a valid card.');
      return; // Prevent the purchase from proceeding
    }

    // Check if the expiration date is valid before proceeding
    if (!$scope.isExpirationDateValid()) {
      alert('The expiration date of your credit card is in the past. Please update your payment information.');
      return; // Prevent the purchase from proceeding
    }

    $scope.submitting = true;
    cart.submitOrder().then(function(orderId) {
      $location.path('thank-you').search({orderId: orderId});
    });
  };

  $scope.updateFranchiseImage = function(cardNumber) {
    var src = '';
    if (cardNumber.startsWith('4')) {
      src = './img/creditcards-icons/visa.png'; // Update with the correct path to your Visa image
    } else if (cardNumber.startsWith('5')) {
      src = './img/creditcards-icons/master.png'; // Update with the correct path to your MasterCard image
    } else if (cardNumber.startsWith('6')) {
      src = './img/creditcards-icons/discover.png'; // Path to your Discover image
    } else {
      src = './img/creditcards-icons/blocked.png'; // Path to your American Express image
    }

    var imgElement = document.getElementById('ccFranchiseImage');
    imgElement.src = src;
  };

  $scope.isExpirationDateValid = function() {
    var expirationDate = $scope.cart.payment.expire; // Expected format: "mm/yyyy"
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day for comparison

    var parts = expirationDate.split('/');
    if (parts.length !== 2) {
      return false; // Invalid format
    }

    var expMonth = parseInt(parts[0], 10) - 1; // Month is 0-indexed in JavaScript Date
    var expYear = parseInt(parts[1], 10);

    if (isNaN(expMonth) || isNaN(expYear)) {
      return false; // Invalid month or year
    }

    var expiration = new Date(expYear, expMonth + 1, 0); // Set to the last day of the expiration month

    return expiration >= today;
  };

});
