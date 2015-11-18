(function() {
  'use strict';

  angular
    .module('tawks.survey')
    .controller('QuestionCtrl', QuestionCtrl)
  ;

  function QuestionCtrl($window, $mdDialog, $scope, $state, Services) {
    var vm = this;
    var questionObj = $state.current.data.question;

    vm.userResponse = {
      questionId: questionObj.Id,
      answer: []
    };

    vm.questionId = questionObj.Id;
    vm.currentState = parseInt($state.current.name, 10);
    vm.defineAnswer = defineAnswer;
    vm.surveyLength = Services.getSurveyLength();
    vm.questionText = questionObj.Content;
    vm.responses = questionObj.Responses;
    vm.goToNextQuestion = goToNextQuestion;
    vm.answer = {};
    vm.selectCheckBox = selectCheckbox;
    vm.selectRadio = selectRadio;
    vm.lastQuestion = lastQuestion;
    vm.saveSurvey = saveSurvey;
    vm.staggered = staggered;
    vm.stopper = false;


    activate();

    function activate() {

    }

    function selectCheckbox(id, value) {
      var response = {
        answerId: id
      };

      if(value) {
        vm.userResponse.answer.push(response);
      } else {
        var index = vm.userResponse.answer.indexOf(response);
        vm.userResponse.answer.splice(index, 1);
      }
    }

    function selectRadio(id, doSaveSurvey, ev) {
      var response = {
        answerId: id
      };

      vm.userResponse.answer.push(response);

      if(doSaveSurvey) {
        saveSurvey(ev);
      } else {
        goToNextQuestion();
      }

    }

    function lastQuestion() {
      if(vm.currentState === vm.surveyLength - 1 || vm.stopper) {
        return true;
      } else {
        return false;
      }

    }



    function goToNextQuestion() {
      Services.addSurveyResponse(vm.userResponse, vm.currentState);
      var state = vm.currentState + 1;
      $state.go(state.toString());
    }

    function defineAnswer(ev, definition) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title('Definition')
          .content(definition)
          .ariaLabel('Definition')
          .ok('Okay')
          .targetEvent(ev)
      );
    }

    function saveSurvey(ev) {

      Services.addSurveyResponse(vm.userResponse, vm.currentState);

      var surveyResults = Services.getSurveyResponses();

      Services.saveSurvey(surveyResults).then(function(result) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('Thank You')
            .content('Your answers have been submitted. You can close your browser.')
            .ariaLabel('You have submitted your answer')
            .ok('Okay')
            .targetEvent(ev)
        ).then(function() {
            $window.location.href = 'https://tawks.azurewebsites.net';
          });

      }).catch(function(error) {
        alert(error);
      });

    }

    function staggered(id) {

      var response = {
        answerId: id
      };

      vm.userResponse.answer.push(response);
      // reset form

      vm.questionText = 'Add another function';
      console.log(vm.responses);
      var previousAnswer = _.find(vm.responses, {'Id': parseInt(id, 10)});
      _.pull(vm.responses, previousAnswer);

      vm.hideStaggeredButton = true;
      vm.answer = {};
      $scope.multiChoice.$setPristine();


    }

    //$scope.$watch(
    //  function() { return vm.stopper; },
    //  function(newValue) { vm.stopper = newValue;}
    //);

    $scope.$watch(
      function() { return vm.answer; },
      function(newValue) {
        if(newValue) {
          var answer = _.find(vm.responses, {"Id" : parseInt(newValue, 10)});

          if(typeof answer.Stopper !== 'undefined') {
            if(answer.Stopper) {
              vm.stopper = true;
            }
            if(!answer.Stopper) {
              vm.stopper = false;
            }
          }
        }
      }
    );

  }

})();