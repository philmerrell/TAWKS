(function(app) {

  app.controller('Screen3Controller', function ($scope, $timeout) {
    var model = this;

    model.labels = ["January", "February", "March", "April", "May", "June", "July"];
    model.series = ['Series A', 'Series B'];
    model.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    model.onClick = function (points, evt) {
      console.log(points, evt);
    };



    init();

    function init() {
      // Simulate async data update
      $timeout(function () {
        model.data = [
          [28, 48, 40, 19, 86, 27, 90],
          [65, 59, 80, 81, 56, 55, 40]
        ];
      }, 3000);
    }
    init();


  });

}(angular.module("tawks.reports")));