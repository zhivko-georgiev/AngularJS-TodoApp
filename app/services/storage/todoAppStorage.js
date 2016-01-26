(function() {
    'use strict';

    angular
        .module('todoApp')
        .factory('todoAppStorage', service);

    /** @ngInject */
    function service(localStorageService) {
        var todoLists = localStorageService.get("todoApp") || [];
        todoLists = _.isString(todoLists) ? JSON.parse(todoLists) : todoLists;

        return {
            todoListTodos: todoListTodos,
            addTodoList: addTodoList,
            addTodosToList: addTodosToList,
            getAllTodoListsNames: getAllTodoListsNames,
            todoLists: todoLists
        };

        function todoListTodos(todoListName) {
            return _.filter(todoLists, {'name': todoListName});

        }

        function addTodoList(newTodoListName) {
            var allLists = todoLists;
            var lastElement = _.last(allLists);
            var foundExistingName = undefined;

            if (lastElement === undefined) {
                allLists.push({
                    id: 1,
                    name: newTodoListName,
                    todos: []
                });

                localStorageService.set("todoApp", allLists);
            } else {
                foundExistingName = _.find(allLists, {
                    'name': newTodoListName
                });

                if (foundExistingName === undefined) {
                    allLists.push({
                        id: lastElement.id + 1,
                        name: newTodoListName,
                        todos: []
                    });

                    localStorageService.set("todoApp", allLists);
                }
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