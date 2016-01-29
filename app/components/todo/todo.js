(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todo', todo);


    function todo() {
        var directive = {
            templateUrl: './components/todo/todo.html',
            restrict: 'E',
            controller: controller,
            scope: {
                data: '=',
                todoListName: '='
            }
        };

        return directive;
    }


    /** @ngInject */
    function controller($scope, localStorageService, todoAppStorage) {
        var todosInStore = todoAppStorage.todoListTodos($scope.data) || [];

        $scope.hideEditRemoveButtons = true;
        $scope.editMode = false;

        $scope.hoverIn = function() {
            $scope.hideEditRemoveButtons = false;
            $scope.editModeOFF = true;
        };

        $scope.hoverOut = function() {
            $scope.hideEditRemoveButtons = true;
        };

        $scope.removeTodo = function() {
            todoAppStorage.removeTodoFromList($scope.todoListName, $scope.data);
        };

        $scope.editTodo = function() {
            $scope.hideEditRemoveButtons = true;
            $scope.editMode = true;
           
        };

        $scope.changeTodoStatus = function() {
            todoAppStorage.changeTodoStatus($scope.todoListName, $scope.data.id);
        };

        $scope.updateTodo = function() {
            todoAppStorage.updateTodoValue($scope.todoListName, $scope.data.id, $scope.data.value);

            $scope.editMode = false;
        };
    }
})();