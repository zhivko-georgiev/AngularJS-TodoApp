(function () {
    'use strict';

    angular
        .module('todoApp')
        .factory('todoAppStorage', service);
    
    /** @ngInject */
    function service(localStorageService) {
        return {
            todoListTodos: todoListTodos,
            addTodoList: addTodoList,
            addTodosToList: addTodosToList,
            getAllTodoListsNames: getAllTodoListsNames
        };

        function todoListTodos(todoListName) {
            return localStorageService.get(todoListName) || [];
        }

        function addTodoList(newTodoListName, todos) {
            var todoListFound = _.indexOf(getAllTodoListsNames(), newTodoListName);

            if (todoListFound === -1) {
                localStorageService.set(newTodoListName, todos);
            } else {
                // TODO: Indicate somehow that such entry exists.
            }
        }

        function addTodosToList(todoListName, todos) {
            var todosInStore = localStorageService.get(todoListName) || [];

            todosInStore = todos;

            localStorageService.set(todoListName, todosInStore);
        }

        function getAllTodoListsNames() {
            return localStorageService.keys();
        }
    }
}());