(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todo', todo);


    function todo() {
        var directive = {
            templateUrl: './states/todo/todo.html',
            restrict: 'E',
            controller: controller
        };

        return directive;
    }

    /** @ngInject */
    function controller($scope, localStorageService) {
        var todosInStore = localStorageService.get('todos'),
            todo = todo || '',
            todos = todosInStore || [];

        $scope.todo = todo;
        $scope.todos = todos;
        

        $scope.$watch('todos', function() {
            localStorageService.set('todos', todos);
        }, true);

        $scope.addTodo = function() {
            if ($scope.todo.length === 0) {
                return;
            }
            $scope.todos.push($scope.todo);
            $scope.todo = '';
        };

        $scope.removeTodo = function(index) {
            $scope.todos.splice(index, 1);
        };
    }
})();