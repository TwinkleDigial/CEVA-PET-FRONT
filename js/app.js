var app = angular.module('cevapetgame', [
	'ngMaterial', 
	'ngMessages', 
	'ngResource', 
	'ui.router',
	'ngAnimate',
	'ngFileUpload',
	'angular-loading-bar',
	'md.data.table',
	'ui.utils.masks',
  'ui.tinymce',
  'slickCarousel'
	])

// app.run(function($trace) {
//   $trace.enable('TRANSITION');
// })

app.config(["$mdThemingProvider", function ($mdThemingProvider) {

	var cevaPurple = $mdThemingProvider.extendPalette('teal', {
      '300': '#B781BA',
      '500': '#A068A3',
      '800': '#7E4281',
	    'contrastDefaultColor': 'light'
	});
  $mdThemingProvider.definePalette('cevaPurple', cevaPurple);

	$mdThemingProvider.theme('default')
		.primaryPalette('cevaPurple', {
			'default': '500',
      'hue-1': '300',
      'hue-2': '800'
      
    })
    .accentPalette('cevaPurple')
}])

app.config(['$mdDateLocaleProvider', function($mdDateLocaleProvider) {
	$mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function(date) {
      var m = moment(date);
      return m.isValid() ? m.format('L') : '';
    };
}])

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])	

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", 
		function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });	

	$stateProvider
		.state('login', {
			url: '/',
			views: {
				'app@': {
					templateUrl: './views/login/login.html',
					controller: 'LoginCtrl'
				}
			},
			resolve: {
				
			}
    })
    
    .state('app', {
      url: '/dashboard',
      views: {
        'app@': {
          templateUrl: './views/dashboard/dashboard.html',
          controller: 'DashCtrl'
        },
        'content@app': {
          templateUrl: './views/dashboard/dashboard.home.html',
          controller: 'DashHomeCtrl'
        }
      },
      resolve: {

      }
    })

		// .state('new-admission', {
		// 	url: '/candidato/:id',
		// 	views: {
		// 		'app@': {
		// 			templateUrl: '/app/modules/employee-form/employee-form.html',
		// 			controller: 'EmployeeFormCtrl'
		// 		}
		// 	},
		// 	resolve: {
		// 		validate: function(api, $timeout, $stateParams){
		// 			console.log($stateParams)
		// 		}
		// 	}
		// })

		// .state('app', {
		// 	abstract: true,
		// 	views: {
		// 		'app@': {
		// 			templateUrl: '/app/modules/admission/app.html'
		// 		}
		// 	},
		// 	resolve: {
		// 		validate: function(loginFactory, $timeout, $state) {
		// 			if(localStorage.getItem('sessionID')){
		// 				return loginFactory
		// 						.authenticate(localStorage.getItem('sessionID'))
		// 			}

		// 			return $state.go('login')
		// 		}
		// 	}
		// })

		// .state('app.admission', {
		// 	url: '/admissoes',
		// 	views: {
		// 		'content@app': {
		// 			templateUrl: '/app/modules/admission/admission.html'
		// 		},
		// 		'main@app.admission': {
		// 			templateUrl: '/app/modules/admission/admission-content.html',
		// 			controller: 'AdmissionCtrl'
		// 		},
		// 		'header@app': {
		// 			templateUrl: '/app/modules/admission/admission-header.html',
		// 			controller: 'MainCtrl'
		// 		}
		// 	}
		// })

		// .state('app.admission.new', {
		// 	url: '/nova',
		// 	views: {
		// 		'main@app.admission': {
		// 			templateUrl: '/app/modules/new-employee/new-employee.html',
		// 			controller: 'newEmployeeCtrl'
		// 		}
		// 	},
		// 	resolve: {
		// 		company: function(api, loginFactory){
		// 			return api.getCompany(localStorage.getItem('company'), 
		// 				localStorage.getItem('sessionID'))
		// 				.then(response => {
		// 					return response.info
		// 				})
		// 		}
		// 	}
		// })

		// .state('app.admission.new.first', {
		// 	url: '/vaga',
		// 	views: {
		// 		'forms@app.admission.new': {
		// 			templateUrl: '/app/modules/new-employee/forms-job.html',
		// 			controller: 'newEmployeeCtrl'
		// 		}
		// 	}
		// })

		// .state('app.admission.new.second', {
		// 	url: '/exame',
		// 	views: {
		// 		'forms@app.admission.new': {
		// 			templateUrl: '/app/modules/new-employee/forms-exam.html',
		// 			controller: 'newEmployeeCtrl'
		// 		}
		// 	}
		// })

		// .state('app.admission.new.third', {
		// 	url: '/funcionario',
		// 	views: {
		// 		'forms@app.admission.new': {
		// 			templateUrl: '/app/modules/new-employee/forms-employee.html',
		// 			controller: 'newEmployeeCtrl'
		// 		}
		// 	}
		// })

		// .state('app.admission.employee', {
		// 	url: '/:id/:name',
		// 	views: {
		// 		'main@app.admission': {
		// 			templateUrl: '/app/modules/employee/employee.html',
		// 			controller: 'EmployeeCtrl'
		// 		}
		// 	}
		// })

		// .state('app.settings', {
		// 	url: '/configuracoes',
		// 	views: {
		// 		'header@app': {
		// 			templateUrl: '/app/modules/admission/admission-header.html',
		// 			controller: 'MainCtrl'
		// 		},
		// 		'content@app': {
		// 			templateUrl: '/app/modules/settings/settings.html',
		// 			controller: 'SettingsCtrl'
		// 		}
		// 	},
		// 	resolve: {
		// 		company: function(api){
		// 			return api.getCompany(localStorage.getItem('company'), 
		// 				localStorage.getItem('sessionID'))
		// 				.then(response => {
		// 					return response.info
		// 				})
		// 		}
		// 	}
		// })

		// .state('logout', {
		// 	resolve: {
		// 		logout: function(loginFactory, $timeout, $state){
		// 			loginFactory.logout(localStorage.getItem('sessionID'))
		// 		}
		// 	}
		// })

		// .state('accessdenied', {
		// 	url: '/negado',
		// 	views: {
		// 		'app@': {
		// 			templateUrl: '/app/modules/login/login.html',
		// 			controller: 'LoginCtrl'
		// 		}
		// 	}
		// })

		$urlRouterProvider.otherwise( function($injector) {
			var $state = $injector.get("$state");
			$state.go('app');
		});
}]);


app.controller('MainCtrl', ['$scope', '$mdMedia', '$window', '$rootScope', 
		function($scope, $mdMedia, $window, $rootScope) {

	$scope.isMobile = $mdMedia('xs')
	
	$scope.triggerMobileMenu = function(event){
		var mobileMenu = document.getElementById('mobile-menu'),
			fade = document.getElementById('fade')

		mobileMenu.classList.toggle('is-opened')
		fade.classList.toggle('is-opened')
	}
	

}])