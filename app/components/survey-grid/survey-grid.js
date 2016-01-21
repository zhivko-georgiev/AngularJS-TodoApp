(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('surveyGrid', surveyGrid);

    function surveyGrid() {
        var directive = {
            templateUrl: './components/survey-grid/survey-grid.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', '$rootScope', 'survey'];

    function controller($scope, $rootScope, SurveysService) {
        console.log('Grid controller injected!');
        $scope.$on('dataloaded', function (event, params) {
            $scope.data = SurveysService.getSurveyList();
        });

        $scope.filterBy = 'All';
        $scope.predicate = undefined;
        $scope.reverse = false;

        $scope.rowFilterHandler = function (value) {
            if ($scope.filterBy === 'Draft') {
                return ! value.isPublished;
            } else if ($scope.filterBy === 'Published') {
                return value.isPublished && value.published.length > 0;
            } else if ($scope.filterBy === 'All') {
                return true;
            } else if ($scope.filterBy === 'Survey') {
                return (value.type === 'survey') ;
            } else if ($scope.filterBy === 'Form') {
                return (value.type === 'form');
            } else {
                throw Error('Invalid filter');
            }
        };

        //$scope.test = function (name) {
        //  var result = [],
        //      name = name.toLowerCase();
        //
        //  _.each($scope.data, function (survey) {
        //    if(~survey.name.indexOf(name)) {
        //      console.log(survey.name)
        //      result.push(survey);
        //    }
        //  });
        //
        //  $scope.list = result;
        //};
        $scope.columnFilterHandler = function (predicate, items) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;

            if(predicate === 'created') {
                items.sort(function (a, b) {
                    if(a.created) {
                        return  $scope.reverse ? (Date.parse(a[predicate]) < Date.parse(b[predicate]) ? 1 : -1) :
                            (Date.parse(a[predicate]) > Date.parse(b[predicate]) ? 1 : -1);
                    } else {
                        return 1;
                    }
                });
                return items;
            } else if (predicate === 'published') {
                items.sort(function (a, b) {
                    if(a.published) {
                        return  $scope.reverse ? (Date.parse(a[predicate]) < Date.parse(b[predicate]) ? 1 : -1) :
                            (Date.parse(a[predicate]) > Date.parse(b[predicate]) ? 1 : -1);
                    } else {
                        return 1;
                    }
                });
                return items;

            } else {
                items.sort(function (a, b) {
                    return (a[predicate] > b[predicate] ? 1 : -1);
                });
                if($scope.reverse) { items.reverse(); }
                return items;
            }
        };

        $scope.isSortUp = function (predicate) {
            return $scope.predicate === predicate && !$scope.reverse;
        };

        $scope.isSortDown = function (predicate) {
            return $scope.predicate === predicate && $scope.reverse;
        };

        $scope.getListsLength = function () {
            return _.isArray($scope.lists) && _.size($scope.lists);
        };

        $scope.isEmptyList = function () {
                return !$scope.lists || ($scope.getListsLength() === 0);
        };

        $scope.show = function () {
            $scope.normilizeDateFormat($scope.lists);
        };

        $scope.normilizeDateFormat = function (list){
            _.each(list, function (item) {
                if (item.isPublished) {
                    item.published = moment(item.published).format('MMM-DD-YYYY').toUpperCase();
                }
            });
        };

        $scope.previewSurvey = function (index, type) {
            $rootScope.surveyId = index;
            $scope.$emit('navigation', {page: 'builder.preview', surveyId: index, type: type});
        };

        $scope.createFromExist = function (index, type) {
            $rootScope.surveyId = undefined;
            SurveysService.copySurvey(index);
            SurveysService.setSurveyType(type);
            $scope.$emit('navigation', {page: 'builder.edit', surveyId: SurveysService.getSurveyOne().surveyId, type: type});
        };

        $scope.createNewSurvey = function (type) {
            /*if ($rootScope.isEdit) {
                $rootScope.isEdit = null;
            }
            $rootScope.surveyId = undefined;
            SurveysService.addSurvey();
            SurveysService.setSurveyType(type);*/

            //$scope.$emit('navigation', {page: 'builder.edit', surveyId: SurveysService.getSurveyOne().surveyId, type: type});
            $scope.$emit('navigation', {page: 'builder.edit', surveyId: null, type: null});
        };

        $scope.show();
        var _params = {itemsPerPage: 1, currentPage: 0};
        var recalculatePages = function (event, params) {
            if (!params) {
                params = _params;
            } else {
                _params = params;
            }
            $scope.total = SurveysService.getTotalNumber($scope.rowFilterHandler);
            $scope.lists = SurveysService.getSurveyListLimit(Math.min(Math.ceil($scope.total / params.itemsPerPage) - 1, params.currentPage) * 
                params.itemsPerPage, params.itemsPerPage, $scope.rowFilterHandler);
        };

        $scope.$on('pagination', recalculatePages);
        $scope.$watch('filterBy', $.proxy(recalculatePages, this, null, null)); // jshint ignore: line

        $scope.capitalizeFirstLetter = function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        $scope.resetFilters = function () {
            $scope.filterBy = 'All';
        };

        $scope.$on('$destroy', function () {
            $scope.lists = null;
        });
    }

}(angular));