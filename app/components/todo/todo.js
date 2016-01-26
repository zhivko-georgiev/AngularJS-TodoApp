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
                data: '='
            }
        };

        return directive;
    }


    /** @ngInject */
    function controller($scope, localStorageService, todoAppStorage) {
        var todosInStore = todoAppStorage.todoListTodos($scope.data) || [],
            todo = todo || '',
            todos = todosInStore[0].todos || [];

        $scope.todo = todo;
        $scope.todos = todos;
        $scope.notEditable = true;

        $scope.$watch('todos', function() {
            todoAppStorage.addTodosToList($scope.todoListName, todos);
        }, true);

        $scope.hoverIn = function() {
            $scope.hideButtons = false;
        };

        $scope.hoverOut = function() {
            $scope.hideButtons = true;
            $scope.notEditable = true;
        };

        $scope.addTodo = function() {
            var todoToBeSaved = {};

            if ($scope.todo.length === 0) {
                return;
            }

            todoToBeSaved.value = $scope.todo;
            todoToBeSaved.done = false;

            $scope.todos.push(todoToBeSaved);
            $scope.todo = '';
        };

        $scope.removeTodo = function(index) {
            $scope.todos.splice(index, 1);
        };

        $scope.editTodo = function(index) {
            $scope.notEditable = false;
        };
    }
})();