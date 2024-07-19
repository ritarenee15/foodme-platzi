"use strict";

foodMeApp.service("AuthService", function ($rootScope) {
  this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  this.login = function () {
    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    $rootScope.$broadcast("loginStatusChanged", this.isLoggedIn);
  };

  this.logout = function () {
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    $rootScope.$broadcast("loginStatusChanged", this.isLoggedIn);
  };

  this.getLoginStatus = function () {
    return this.isLoggedIn;
  };
});
