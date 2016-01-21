(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('hi', hi)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('hi', {
                url: '/hi',
                template: '<hi name="\'Bob\'"></hi>'
            });
    }

    function hi() {
        var directive = {
            templateUrl: './states/hi/hi.html',
            restrict: 'E',
            controller: controller,
            scope: {
                name: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'survey'];
    function controller($scope, survey) {
        $scope.survey = survey;

        $scope.sayHi = sayHi;
        $scope.sayHi1 = sayHi1;
        $scope.sayHi2 = sayHi2;

        function sayHi() {
            alert('Hi to you ' + $scope.name + '! Give me ' + survey.getTotalNumber() + '!');
        }

        function sayHi1() {
            return 'Hi Maria!';
        }

        function sayHi2() {
            $scope.date = 'qqq';
        }
    }

}(angular));