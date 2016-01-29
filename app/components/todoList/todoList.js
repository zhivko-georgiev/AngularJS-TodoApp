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
        $scope.hideEditRemoveButtons = true;
        $scope.editMode = false;

        $scope.hoverIn = function() {
            $scope.hideEditRemoveButtons = false;
        };

        $scope.hoverOut = function() {
            $scope.hideEditRemoveButtons = true;
        };

         $scope.addTodoToList = function() {
            var todoValue = $scope.todo,
                todoToBeSaved = {};

            if (todoValue === undefined || todoValue.length === 0) {
                return;
            }

            todoToBeSaved.value = todoValue;
            todoToBeSaved.done = false;

            todoAppStorage.addTodoToList($scope.data.name, todoToBeSaved);

            $scope.todo = '';
        };

        $scope.editTodoList = function() {
            $scope.editMode = true;
        };

        $scope.updateTodoListName = function() {
            todoAppStorage.updateTodoList($scope.data.id, $scope.data.name);

            $scope.editMode = false;
        };

        $scope.removeTodoList = function() {
             todoAppStorage.removeTodoList($scope.data.id);
        };
    }
}());