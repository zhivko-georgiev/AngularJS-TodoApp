(function() {
    'use strict';

    angular
        .module('todoApp', ['ui.router', 'ui.sortable', 'LocalStorageModule'])
        .directive('todoApp', todoApp)
        .config(config);


    /** @ngInject */
    function config($stateProvider, localStorageServiceProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                template: '<todo-app></todo-app>'
            });

        localStorageServiceProvider.setPrefix('todoApp');
    }


    function todoApp() {
        var directive = {
            templateUrl: './states/app/app.html',
            restrict: 'E'
        };
        return directive;
    }

}());