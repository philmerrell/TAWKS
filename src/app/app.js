(function(app) {

    app.config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/home');

        $mdIconProvider
          .icon("menu", "./assets/svg/menu.svg", 24);

        $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('red')
        ;

      $httpProvider.interceptors.push('AuthInterceptor');
      $locationProvider.html5Mode(true);


    });

    app.run(function () {});

    app.controller('AppController', function ($mdSidenav, $state, Services) {

      var app = this;

      app.go = go;
      app.toggleList = toggleList;

      activate();

      function activate() {
        Services.getSurvey()
          .then(Services.createSurveyStates)
          .then(Services.startSurvey);
      }

      function go(state){
        $state.go(state);
      }

      function toggleList() {
        $mdSidenav('left').toggle();
      }


    });

    app.factory('AuthInterceptor', function AuthInterceptor ($q, $window, $rootScope, $injector) {
      return {
        response: function (response) {
          return response;
        },
        responseError: function (response) {

          if (response.status === 401) {

            $window.location.href = 'https://tawks.azurewebsites.net/Account/Login?ReturnUrl=%2Fapp';

          } else {

            $rootScope.$broadcast('response:error', response);
          }

          return $q.reject(response);
        }
      };
  });

    app.provider('runtimeStates', function runtimeStates($stateProvider) {
      // runtime dependencies for the service can be injected here, at the provider.$get() function.
      this.$get = function($q, $timeout, $state) { // for example
        return {
          addState: function(name, state) {
            $stateProvider.state(name, state);
          }
        };
      };
    });

}(angular.module("tawks", [
    'ngMaterial',
    'tawks.home',
    'tawks.reports',
    'tawks.survey',
    'tawks.services',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'chart.js'
])));
