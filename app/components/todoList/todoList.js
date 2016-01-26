(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todoList', todoList);

    function todoList() {
        var directive = {
            templateUrl: './components/todoList/todoList.html',
            restrict: 'E',
            controller: controller,
            scope: {
                data: '='
            }
        };
        return directive;
    }

    /** @ngInject */
    function controller($scope, todoAppStorage) {
        $scope.isTodoListInputHidden = true;
        $scope.newTodoListName = '';
        $scope.todoLists = todoAppStorage.todoLists;
    }
}());