(function (angular) {
    'use strict';

    angular.module('app', ['ui.router'])
    .config(config)
    .run(run);

    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    run.$inject = [];
    function run() {
        
    }

})(angular);
