(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('previewState', previewState)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('preview', {
                url: '/surveys/:id',
                template: '<preview-state></preview-state>'
            });
    }

    function previewState() {
        var directive = {
            templateUrl: './states/preview/preview.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', '$stateParams', 'surveyViewer.factory.ViewerAPI', '$location'];
    function controller($scope, $stateParams, SurveyService, $location) {
		var id = Number($location.absUrl().split('/')[4]);
		SurveyService.setDomain($location.protocol() + '://' + $location.host() + ':' + $location.port());
		SurveyService.setSurveyId(id);
		$scope.start = SurveyService.getSurvey($scope);
        console.log('qqq');
    }

}(angular));