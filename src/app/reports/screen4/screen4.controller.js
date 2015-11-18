(function(app) {

  app.controller('Screen4Controller', function ($scope, $timeout) {
    var model = this;

    model.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

    model.data = [
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100]
    ];

    init();

    function init() {
      // Simulate async data update

    }

  });

}(angular.module("tawks.reports")));