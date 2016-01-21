(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('gridState', gridState)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('grid', {
                url: '/',
                template: '<grid-state></grid-state>'
            });
    }

    function gridState() {
        var directive = {
            templateUrl: './states/grid/grid.html',
            //template: '<div>qqq!</div>',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', '$rootScope', 'survey'];
    function controller($scope, $rootScope, survey) {
        console.log('qqq');
    }

}(angular));