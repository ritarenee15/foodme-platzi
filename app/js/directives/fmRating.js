"use strict";

foodMeApp.directive("fmRating", function () {
  return {
    restrict: "E",
    scope: {
      symbol: "@",
      max: "@",
      readonly: "@",
    },
    require: "ngModel",
    link: function (scope, element, attrs, ngModel) {
      attrs.max = scope.max = parseInt(scope.max || 5, 10);

      if (!attrs.symbol) {
        attrs.symbol = scope.symbol = "\u2605";
      }

      var styles = [];
      scope.styles = styles;

      for (var i = 0; i < scope.max; i++) {
        styles.push({ "fm-selected": false, "fm-hover": false });
      }

      scope.enter = function (index) {
        if (scope.readonly) return;
        angular.forEach(styles, function (style, i) {
          style["fm-hover"] = i <= index;
        });
      };

      scope.leave = function (index) {
        if (scope.readonly) return;
        angular.forEach(styles, function (style, i) {
          style["fm-hover"] = false;
        });
      };

      // view -> model
      scope.select = function (index) {
        if (scope.readonly) return;

        ngModel.$setViewValue(index == null ? null : index + 1);
        udpateSelectedStyles(index);
      };

      // model -> view
      ngModel.$render = function () {
        udpateSelectedStyles(ngModel.$viewValue - 1);
      };

      function udpateSelectedStyles(index) {
        if (index == null) index = -1;

        angular.forEach(styles, function (style, i) {
          style["fm-selected"] = i <= index;
        });
      }
    },
    template:
      '<ul class="fm-rating" ng-class="{\'fm-rating-pointer\':!readonly}">' +
      '<li ng-repeat="style in styles" ng-class="style" ' +
      'ng-click="select($index)" ng-mouseenter="enter($index)" ng-mouseleave="leave($index)">' +
      "{{symbol}}" +
      "</li>" +
      "</ul>" +
      '<a ng-hide="readonly" ng-click="select(null)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#FF5353"/></svg></a>',
  };
});
