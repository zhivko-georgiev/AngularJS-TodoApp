(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('surveyPagination', surveyPagination);

    function surveyPagination() {
        var directive = {
            templateUrl: './components/survey-grid/survey-pagination/survey-pagination.html',
            restrict: 'E',
            controller: controller
        };

        return directive;
    }

    controller.$inject = ['$scope', '$rootScope'];

    function controller($scope, $rootScope) {
        console.log('Pagination controller injected!');
        $scope.itemsPerPage = $rootScope.itemsPerPage || 15;
        $scope.currentPage = $rootScope.currentPage || 0;


        $scope.$on('dataloaded', function (event, params) {
            $scope.$emit('pagination', {
                'itemsPerPage': $scope.itemsPerPage,
                'currentPage': $scope.currentPage
            });
        });

        $scope.chooseValue = function (item) {
            $scope.itemsPerPage = item;
            if ($scope.currentPage > $scope.pageCount() - 1) {
                $scope.currentPage = $scope.pageCount() - 1;
            }
        };

        $scope.getNumber = function(num) {
            var mod = Math.ceil(num/5),
                    result = [];
            for (var i=0; i < mod; i++) {
                result.push((i+1)*5);
            }
            return result;
        };

        $scope.range = function(num) {
            return !_.isNaN(num) && new Array(num);
        };

        //$scope.prevPage = function() {
        //  ($scope.currentPage > 0) && ($scope.currentPage--);
        //};

        $scope.toFirstPage = function () {
            $scope.currentPage = 0;
        };

        $scope.toLastPage = function () {
            $scope.currentPage = $scope.pageCount() - 1;
        };

        //$scope.nextPage = function() {
        //  ($scope.currentPage < $scope.pageCount() - 1) && ($scope.currentPage++);
        //};

        $scope.pageCount = function() {
            return Math.ceil($scope.total/$scope.itemsPerPage);
        };

        $scope.setPage = function(index) {
            if (index >= 0 && index < $scope.pageCount()) {
                $scope.currentPage = index;
            }
        };

        $scope.$watch('currentPage+itemsPerPage', function() {
            $scope.$emit('pagination', {
                'itemsPerPage': $scope.itemsPerPage,
                'currentPage': $scope.currentPage
            });
            $rootScope.itemsPerPage = $scope.itemsPerPage;
            $rootScope.currentPage = $scope.currentPage;
        });
    }

}(angular));