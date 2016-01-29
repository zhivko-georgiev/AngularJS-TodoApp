(function() {
    'use strict';

    angular
        .module('todoApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap', 'cgPrompt'])
        .directive('todoApp', todoApp)
        .config(config);


    /** @ngInject */
    function config($stateProvider, localStorageServiceProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                template: '<todo-app></todo-app>'
            });

        localStorageServiceProvider.setPrefix('ls');
    }


    function todoApp() {
        var directive = {
            templateUrl: './states/app/app.html',
            restrict: 'E'
        };
        return directive;
    }

}());