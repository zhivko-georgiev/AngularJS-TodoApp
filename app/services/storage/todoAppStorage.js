(function() {
    'use strict';

    angular
        .module('todoApp')
        .factory('todoAppStorage', service);

    /** @ngInject */
    function service(localStorageService) {
        var todoLists = localStorageService.get('todoApp') || [];
        todoLists = _.isString(todoLists) ? JSON.parse(todoLists) : todoLists;

        return {
            todoListTodos: todoListTodos,
            addTodoList: addTodoList,
            addTodoToList: addTodoToList,
            todoLists: todoLists,
            removeTodoFromList: removeTodoFromList,
            changeTodoStatus: changeTodoStatus,
            updateTodoValue: updateTodoValue,
            updateTodoList: updateTodoList,
            removeTodoList: removeTodoList
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

                localStorageService.set('todoApp', allLists);
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

                    localStorageService.set('todoApp', allLists);
                }
            }
        }

        function addTodoToList(todoListName, todo) {
            var newListTodos = todoListTodos(todoListName)[0].todos;
            var todoExists = _.find(newListTodos, {'value': todo.value});

            if (todoExists !== undefined) {
                return;
            }

            if (newListTodos.length === 0) {
                todo.id = 1;
            } else {
                todo.id = _.last(newListTodos).id + 1;
            }

            newListTodos.push(todo);

            for (var todoList in todoLists) {
                if (todoList.name === todoListName) {
                    todoList.todos = newListTodos;
                }
            }

            localStorageService.set('todoApp', todoLists);
        }

        function removeTodoFromList(todoListName, todo) {
            var storedListTodos = todoListTodos(todoListName)[0].todos;

            _.remove(storedListTodos, function(t) {
                return t.value === todo.value;
            });

            var allLists = todoLists;

            for(var list in allLists) {
                if (list.name === todoListName) {
                    list.todos = storedListTodos;
                }
            }

            localStorageService.set('todoApp', allLists);
        }

        function changeTodoStatus(todoListName, todoId) {
            var listTodos = todoListTodos(todoListName),
                allLists = todoLists;

            for(var todo in listTodos) {
                if (todo.id === todoId) {
                    todo.done = !todo.done;
                }
            }

            for(var list in allLists) {
                if (list.name === todoListName) {
                    list.todos = listTodos;
                }
            }

            localStorageService.set('todoApp', allLists);
        }

        function updateTodoValue(todoListName, todoId, newTodoValue) {
            var listTodos = todoListTodos(todoListName),
                allLists = todoLists;

            for(var todo in listTodos) {
                if (todo.id === todoId) {
                    todo.value = newTodoValue;
                }
            }

            for(var list in allLists) {
                if (list.name === todoListName) {
                    list.todos = listTodos;
                }
            }

            localStorageService.set('todoApp', allLists);
        }

        function updateTodoList(todoListId, newTodoListName) {
            var allLists = todoLists;

            for(var list in allLists) {
                if (list.id === todoListId) {
                    list.name = newTodoListName;
                }
            }

            localStorageService.set('todoApp', allLists);

        };

        function removeTodoList(todoListId) {
            var allLists = todoLists;

            console.log(todoListId);

            _.remove(allLists, function(l) {
                return l.id === todoListId;
            });

            localStorageService.set('todoApp', allLists);
        };
    }
}());