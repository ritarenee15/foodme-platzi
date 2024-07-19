"use strict";

foodMeApp.controller(
  "NavbarController",
  function NavbarController($scope, $location) {
    $scope.routeIs = function (routeName) {
      return $location.path() === routeName;
    };

    /* $scope.isLoggedIn = AuthService.getLoginStatus(); */

    /*  $scope.showDropdown = false; */

    /* $scope.logout = function () {
      AuthService.logout();
      $scope.isLoggedIn = AuthService.getLoginStatus();
      $location.path("/");
    }; */

    /* $scope.$on("loginStatusChanged", function (event, isLoggedIn) {
      $scope.isLoggedIn = isLoggedIn;
    }); */

    /* $scope.getTotalItemsInCart = function () {
      return CartService.getTotalItemsInCart();
    }; */
  }
);
