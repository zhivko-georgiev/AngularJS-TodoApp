(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todoLists', todoLists);

    function todoLists() {
        var directive = {
            templateUrl: './components/todoLists/todoLists.html',
            restrict: 'E',
            controller: controller
        };
        return directive;
    }

    /** @ngInject */
    function controller($scope, todoAppStorage) {
        $scope.isTodoListInputHidden = true;
        $scope.newTodoListName = '';
        $scope.todoLists = todoAppStorage.todoLists;
        
        $scope.addTodoList = function() {
            $scope.isTodoListInputHidden = false;
            var newTodoListName = $scope.newTodoListName;

            if (newTodoListName !== '') {
                var todosInStore = todoAppStorage.todoListTodos(newTodoListName);

                if (todosInStore === null) {
                    todosInStore = [];
                }

                todoAppStorage.addTodoList(newTodoListName, todosInStore);
            }
        };
    }
}());