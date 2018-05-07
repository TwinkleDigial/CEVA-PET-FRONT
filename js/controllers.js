app.controller('LoginCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {

    $scope.triggerMobileMenu = function (event) {
      var mobileMenu = document.getElementById('mobile-menu'),
        fade = document.getElementById('fade')

      mobileMenu.classList.toggle('is-opened')
      fade.classList.toggle('is-opened')
    }


  }])

app.controller('DashCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {

    $scope.triggerMobileMenu = function (event) {
      var mobileMenu = document.getElementById('mobile-menu'),
        fade = document.getElementById('fade')

      mobileMenu.classList.toggle('is-opened')
      fade.classList.toggle('is-opened')
    }


  }])

app.controller('DashHomeCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {

    $scope.slickConfig = {
      enabled: true,
      autoplay: true,
      draggable: true,
      autoplaySpeed: 5000,
      nextArrow: '<i class="fas fa-chevron-right"></i>',
      prevArrow: '<i class="fas fa-chevron-left"></i>',
      method: {},
      event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
        }
      }
    };


  }])