(function(module) {

    module.config(function ($stateProvider) {
        $stateProvider
          .state('reports', {
            url: '/reports',
            views: {
                "main": {
                    controller: 'ReportsController as model',
                    templateUrl: 'reports/reports.tpl.html'
                }
            },
            data:{ pageTitle: 'Reports' }
          })
          .state('screen1', {
              url: '/screen1',
              views: {
                  "main": {
                      controller: 'Screen1Controller as model',
                      templateUrl: 'reports/screen1/screen1.tpl.html'
                  }
              },

              data: {pageTitle: 'Screen 1'}
          })

          .state('screen2', {
            url: '/screen2',
            views: {
              "main": {
                controller: 'Screen2Controller as model',
                templateUrl: 'reports/screen2/screen2.tpl.html'
              }
            },

            data: {pageTitle: 'Screen 2'}
          })

          .state('screen3', {
            url: '/screen3',
            views: {
              "main": {
                controller: 'Screen3Controller as model',
                templateUrl: 'reports/screen3/screen3.tpl.html'
              }
            },

            data: {pageTitle: 'Screen 3'}
          })

          .state('screen4', {
            url: '/screen4',
            views: {
              "main": {
                controller: 'Screen4Controller as model',
                templateUrl: 'reports/screen4/screen4.tpl.html'
              }
            },

            data: {pageTitle: 'Screen 4'}
          })
        ;
    });

}(angular.module("tawks.reports", [
    'ui.router'
])));
