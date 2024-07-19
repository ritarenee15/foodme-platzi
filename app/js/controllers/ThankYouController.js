"use strict";

foodMeApp.controller(
  "ThankYouController",
  function ThankYouController($scope, $routeParams) {
    $scope.orderId = $routeParams.orderId;

    $scope.launchConfetti = function () {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    $scope.launchConfetti();
  }
);
