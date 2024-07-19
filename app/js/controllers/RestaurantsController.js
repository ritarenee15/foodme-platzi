"use strict";

foodMeApp.controller(
  "RestaurantsController",
  function RestaurantsController($scope, customer, $location, Restaurant) {
    if (!customer.address) {
      $location.url("/customer");
    }

    var filter = ($scope.filter = {
      cuisine: [],
      price: null,
      rating: null,
    });

    var allRestaurants = Restaurant.query(filterAndSortRestaurants);
    $scope.$watch("filter", filterAndSortRestaurants, true);

    function filterAndSortRestaurants() {
      $scope.restaurants = [];

      // filter
      angular.forEach(allRestaurants, function (item, key) {
        if (filter.price && filter.price !== item.price) {
          return;
        }

        if (filter.rating && filter.rating !== item.rating) {
          return;
        }

        if (
          filter.cuisine.length &&
          filter.cuisine.indexOf(item.cuisine) === -1
        ) {
          return;
        }

        $scope.restaurants.push(item);
      });

      // sort
      $scope.restaurants.sort(function (a, b) {
        if (a[filter.sortBy] > b[filter.sortBy]) {
          return filter.sortAsc ? 1 : -1;
        }

        if (a[filter.sortBy] < b[filter.sortBy]) {
          return filter.sortAsc ? -1 : 1;
        }

        return 0;
      });
    }

    $scope.sortBy = function (key) {
      if (filter.sortBy === key) {
        filter.sortAsc = !filter.sortAsc;
      } else {
        filter.sortBy = key;
        filter.sortAsc = true;
      }
    };

    $scope.sortIconFor = function (key) {
      if (filter.sortBy !== key) {
        return "";
      }

      return filter.sortAsc ? "\u25B2" : "\u25BC";
    };

    $scope.getCountryImage = function (cuisineName) {
      const country = $scope.COUNTRIES.find(
        (country) => country.name === cuisineName
      );
      return country ? country.image : "";
    };

    $scope.CUISINE_OPTIONS = {
      african: "African",
      american: "American",
      barbecue: "Barbecue",
      cafe: "Cafe",
      chinese: "Chinese",
      "czech/slovak": "Czech / Slovak",
      german: "German",
      indian: "Indian",
      japanese: "Japanese",
      mexican: "Mexican",
      peru: "Perú",
      pizza: "Pizza",
      thai: "Thai",
      vegetarian: "Vegetarian",
    };

    $scope.COUNTRIES = [
      {
        name: "peru",
        image: "../../img/pais/peru.png",
      },
      {
        name: "african",
        image: "../../img/pais/africa.png",
      },
      {
        name: "american",
        image: "../../img/pais/americano.png",
      },
      {
        name: "barbecue",
        image: "../../img/pais/parrilla.png",
      },
      {
        name: "cafe",
        image: "../../img/pais/cafeteria.png",
      },
      {
        name: "chinese",
        image: "../../img/pais/china.png",
      },
      {
        name: "czech/slovak",
        image: "../../img/pais/checo.png",
      },
      {
        name: "german",
        image: "../../img/pais/alemania.png",
      },
      {
        name: "indian",
        image: "../../img/pais/india.png",
      },
      {
        name: "japanese",
        image: "../../img/pais/japon.png",
      },
      {
        name: "mexican",
        image: "../../img/pais/mexico.png",
      },
      {
        name: "pizza",
        image: "../../img/pais/pizza.png",
      },
      {
        name: "thai",
        image: "../../img/pais/tailandia.png",
      },
      { name: "vegetarian", image: "../../img/pais/vegetariano.png" },
    ];
  }
);
