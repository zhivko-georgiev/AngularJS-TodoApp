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
            addTodosToList: addTodosToList
        };

        function todoListTodos(todoListName) {
            var todosInStore = localStorageService.get(todoListName);

            if (todosInStore === null) {
                todosInStore = [];
            }

            return todosInStore;

        }

        function addTodoList(newTodoListName, todos) {
            localStorageService.set(newTodoListName, todos);
        }

        function addTodosToList(todoListName, todos) {
            var todosInStore = localStorageService.get(todoListName);

             if (todosInStore === null) {
                todosInStore = [];
            }

            todosInStore = todos;

            localStorageService.set(todoListName, todosInStore);
        }
    }
}());