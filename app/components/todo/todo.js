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
        var todosInStore = todoAppStorage.todoListTodos($scope.data) || [];

        $scope.hideButtons = true;
        $scope.notEditable = true;

        $scope.hoverIn = function() {
            $scope.hideButtons = false;
        };

        $scope.hoverOut = function() {
            $scope.hideButtons = true;
            $scope.notEditable = true;
        };

        $scope.removeTodo = function(index) {
            todosInStore.splice(index, 1);
        };

        $scope.editTodo = function(index) {
            $scope.notEditable = false;
        };
    }
})();