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
        var todosInStore = todoAppStorage.todoListTodos($scope.data) || [],
            todoId = $scope.data.id,
            todoValue = $scope.data.value,
            todoListName = $scope.todoListName,
            todo = $scope.data;

        $scope.hideButtons = true;
        $scope.notEditable = true;
        $scope.hideSaveButton = true;

        $scope.hoverIn = function() {
            $scope.hideButtons = false;
        };

        $scope.hoverOut = function() {
            $scope.hideButtons = true;
            $scope.notEditable = true;
            $scope.hideSaveButton = true;
        };

        $scope.removeTodo = function() {
            todoAppStorage.removeTodoFromList(todoListName, todo);
        };

        $scope.editTodo = function() {
            $scope.hideButtons = true;
            
            $scope.hideSaveButton = false;
            $scope.notEditable = false;
           
        };

        $scope.changeTodoStatus = function() {
            todoAppStorage.changeTodoStatus(todoListName, todoId);
        };

        $scope.updateTodo = function() {
            todoAppStorage.updateTodoValue(todoListName, todoId, todoValue);
        };
    }
})();