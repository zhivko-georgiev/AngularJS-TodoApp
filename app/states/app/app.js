(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('app', app);

    function app() {
        var directive = {
            templateUrl: './states/app/app.html',
            restrict: 'E'
        };
        return directive;
    }

}(angular));
