app.controller('LoginCtrl', ['$scope', '$rootScope',
  function ($scope, $rootScope) {

    $scope.triggerMobileMenu = function (event) {
      var mobileMenu = document.getElementById('mobile-menu'),
        fade = document.getElementById('fade')

      mobileMenu.classList.toggle('is-opened')
      fade.classList.toggle('is-opened')
    }


  }])