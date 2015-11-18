(function() {
  'use strict';

  angular.module('tawks.services', [])
    .factory('Services', Services)
  ;

  function Services($http, $q, $state, runtimeStates, $location) {

    var surveyQuestions, surveyResponses;
    var surveyId;

    var service = {
      createStateObject   : createStateObject,
      getSurvey           : getSurvey,
      getSurveyLength     : getSurveyLength,
      getEndOfDay         : getEndOfDay,
      createSurveyStates  : createSurveyStates,
      startSurvey         : startSurvey,
      initSurveyResponse  : initSurveyResponses,
      addSurveyResponse   : addSurveyResponse,
      getSurveyResponses  : getSurveyResponses,
      saveSurvey          : saveSurvey
    };

    return service;


    function createSurveyStates(getSurveyResultObj) {

      var defer = $q.defer();
      console.log(getSurveyResultObj.data);
      initSurveyResponses(getSurveyResultObj.data[0].Id);
      surveyQuestions = getSurveyResultObj.data[0].Questions;

      angular.forEach(surveyQuestions, function(question, index) {
        var stateObj = service.createStateObject(question, index);
        runtimeStates.addState(index.toString(), stateObj);
      });

      defer.resolve(surveyQuestions);
      return defer.promise;

    }

    function createStateObject(question, index) {

      var stateObject;
      switch(question.QuestionType) {
        case 'Multi-Select':
          stateObject = {
            url: '/'+index.toString(),
            views: {
              "main": {
                templateUrl: 'survey/multi-select.tpl.html',
                controller: 'QuestionCtrl as vm'
              }
            },
            data: {
              question: question
            }
          };
          break;
        case 'Multi-Choice':
          stateObject = {
            url: '/'+index.toString(),
            views: {
              "main": {
                templateUrl: 'survey/multi-choice.tpl.html',
                controller: 'QuestionCtrl as vm'
              }
            },
            data: {
              question: question
            }
          };
          break;
        case 'Staggered Multi-Select':
          stateObject = {
            url: '/'+index.toString(),
            views: {
              "main": {
                templateUrl: 'survey/staggered-multi-select.tpl.html',
                controller: 'QuestionCtrl as vm'
              }
            },
            data: {
              question: question
            }
          };
          break;

      }

      return stateObject;

    }

    function getSurvey() {
      surveyId = $location.search().id;
      return $http.get('https://tawks.azurewebsites.net/api/survey?id='+surveyId);
    }

    function getSurveyLength() {
      return surveyQuestions.length;
    }

    function getEndOfDay() {
      return $http.get('', {cache:true});
    }

    function startSurvey() {
      $state.go('0');

    }

    function initSurveyResponses(surveyId) {
      surveyResponses = {
        surveyId: surveyId,
        questions: []
      };
    }

    function addSurveyResponse(response, index) {
      surveyResponses.questions[index] = response;
    }

    function getSurveyResponses() {
      return surveyResponses;
    }

    function saveSurvey(responses) {
      return $http.post('https://tawks.azurewebsites.net/api/survey?pingId='+surveyId, responses);
    }

  }
})();