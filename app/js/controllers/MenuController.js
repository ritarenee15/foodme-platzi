"use strict";

foodMeApp.controller(
  "MenuController",
  function MenuController($scope, $routeParams, Restaurant, cart) {
    $scope.restaurant = Restaurant.get({ id: $routeParams.restaurantId });
    $scope.cart = cart;
    $scope.isShow = false;

    $scope.addToCartShowPanel = function (menuItem, restaurant) {
      cart.add(menuItem, restaurant);
      $scope.isShow = true;
    };

    /* $scope.addToCartShowPanel = function (menuItem, restaurant) {
      cart.addItem(menuItem, restaurant);
      $scope.isShow = true;
    }; */

    /* $scope.getTotalItemsInCart = function () {
      return CartService.getTotalItemsInCart();
    }; */

    $scope.closePanel = function () {
      $scope.isShow = false;
    };

    $scope.showPanel = function () {
      $scope.isShow = true;
    };
  }
);
