(function(app) {

  app.controller('Screen2Controller', function ($scope, $timeout) {
    var model = this;

    model.labels = ["Teaching", "Service", "Research", "Other"];
    model.data = [30, 40, 100, 10];

    //model.datalabels = ["January", "February", "March", "April", "May", "June", "July"];
    //model.datasets = [
    //  {
    //    label: "My First dataset",
    //    fillColor: "rgba(220,220,220,0.5)",
    //    strokeColor: "rgba(220,220,220,0.8)",
    //    highlightFill: "rgba(220,220,220,0.75)",
    //    highlightStroke: "rgba(220,220,220,1)",
    //    data: [65, 59, 80, 81, 56, 55, 40]
    //  },
    //  {
    //    label: "My Second dataset",
    //    fillColor: "rgba(151,187,205,0.5)",
    //    strokeColor: "rgba(151,187,205,0.8)",
    //    highlightFill: "rgba(151,187,205,0.75)",
    //    highlightStroke: "rgba(151,187,205,1)",
    //    data: [28, 48, 40, 19, 86, 27, 90]
    //  }
    //];

    model.series = ["Hours Worked", "Average"];

    model.barLabels = ['April', 'May', 'June', 'July'];

    model.barHrsWorked = [
      [14, 28, 42, 56],
      [53, 43, 40, 70]
    ];

    init();

    function init() {
      // Simulate async data update

    }

  });

}(angular.module("tawks.reports")));