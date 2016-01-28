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

         $scope.addTodoToList = function() {
            var todoListName = $scope.data.name,
            todoValue = $scope.todo,
            todoToBeSaved = {};

            if (todoValue === undefined || todoValue.length === 0) {
                return;
            }

            todoToBeSaved.value = todoValue;
            todoToBeSaved.done = false;

            todoAppStorage.addTodoToList(todoListName, todoToBeSaved);

            $scope.todo = '';
        };
    }
}());