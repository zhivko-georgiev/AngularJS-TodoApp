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
            addTodoToList: addTodoToList,
            todoLists: todoLists
        };

        function todoListTodos(todoListName) {
            return _.filter(todoLists, {'name': todoListName});

        }

        function addTodoList(newTodoListName) {
            var allLists = todoLists,
            lastElement = _.last(allLists),
            foundExistingName;

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

        function addTodoToList(todoListName, todo) {
            var newListTodos = todoListTodos(todoListName)[0].todos;
            newListTodos.push(todo);

            for (var todoList in todoLists) {
                if (todoList.name === todoListName) {
                    todoList.todos = newListTodos;
                }
            }

            localStorageService.set("todoApp", todoLists);
        }
    }
}());