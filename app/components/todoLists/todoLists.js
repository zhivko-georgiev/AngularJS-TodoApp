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
    function controller($scope, todoAppStorage, prompt) {
        $scope.newTodoListName = '';
        $scope.todoLists = todoAppStorage.todoLists;

        $scope.addTodoList = function() {
            var newTodoListName = '';

            prompt({
                title: 'Give me a todo list name',
                message: 'What would you like to name it?',
                input: true,
                label: 'Todo List Name',
                value: ''
            }).then(function(newTodoListName) {
                if (newTodoListName !== '') {
                    var todosInStore = todoAppStorage.todoListTodos(newTodoListName);

                    if (todosInStore === null) {
                        todosInStore = [];
                    }

                    todoAppStorage.addTodoList(newTodoListName, todosInStore);
                }
            });
        };
    }
}());