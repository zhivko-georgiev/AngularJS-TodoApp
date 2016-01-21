(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('survey', service);

    service.$inject = ['$http'];

    function service($http) {
        return {
            number: 5,
            getSurveyList: get,
            get: get,
            getTotalNumber: getTotalNumber
        };

        function get() {
            return [{x:1, y:2}];
        }

        function getTotalNumber() {
            return getSurveyListLimit();
        }

        function getSurveyListLimit() {
            return 5;
        }
    }

}(angular));