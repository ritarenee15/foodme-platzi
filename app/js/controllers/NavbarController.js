'use strict';

foodMeApp.controller('NavbarController', function NavbarController($scope, $location, $rootScope, $timeout) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

  $rootScope.$on('$viewContentLoaded', function () {
    $timeout(function () {

      $('#sidebar_fixed').theiaStickySidebar({
        minWidth: 991,
        updateSidebarHeight: true,
        additionalMarginTop: 25
      });
      //Filters collapse
      var $headingFilters = $('.filter_type h4 a');
      $headingFilters.on('click', function () {
        $(this).toggleClass('opened');
      })
      $headingFilters.on('click', function () {
        $(this).toggleClass('closed');
      });

      $('.radio_select input[type="radio"]').on("click", function() {
        var e = $("input[name='time']:checked").val();
        $("#selected_time").text(e)
    })

      //Filters on mobile
      $('a.open_filters').on("click", function () {
        $('.filter_col').toggleClass('show');
        $('main').toggleClass('freeze');
        $('.layer').toggleClass('layer-is-visible');
      });
    });
  });

});
