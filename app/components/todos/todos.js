(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todos', todos);


    function todos() {
        var directive = {
            templateUrl: './components/todos/todos.html',
            restrict: 'E',
            controller: controller
        };

        return directive;
    }

 
    /** @ngInject */
    function controller($scope, localStorageService, todoAppStorage) {
        var todosInStore = todoAppStorage.todoListTodos($scope.todoListName),
            todo = todo || '',
            todos = todosInStore || [];
            
        $scope.todo = todo;
        $scope.todos = todos;
        
        $scope.$watch('todos', function() {
            todoAppStorage.addTodosToList($scope.todoListName, todos);
        }, true);

        $scope.addTodo = function() {
            var todoToBeSaved = {};

            if ($scope.todo.length === 0) {
                return;
            }

            todoToBeSaved['value'] = $scope.todo;
            todoToBeSaved['done'] = false;

            $scope.todos.push(todoToBeSaved);
            $scope.todo = '';
        };

        $scope.removeTodo = function(index) {
            $scope.todos.splice(index, 1);
        };
    }
})();