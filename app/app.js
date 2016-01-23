(function () {
    'use strict';

    angular.module('todoApp', ['ui.router'])
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
})();