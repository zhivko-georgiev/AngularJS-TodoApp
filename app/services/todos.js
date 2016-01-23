(function () {
    'use strict';

    angular
        .module('todoApp')
        .factory('todos', service);

    var id = 1;
    var todoListArray = [];
    var todos = [];
    function service() {
        return {
            todoLists: todoListArray,
            addList: add
        };

        function add(name) {
            if (isDuplicatedList(name)) {
                alert('The list already exists!')
            } else {
                var todo = {
                    id: id, 
                    name: name, 
                    todos: todos
                };

                todoListArray.push(todo);
                    alert('The list has been created successfully')
                    id++;
                }
            }

        function isDuplicatedList(name) {
            return _.some(todoListArray, function(todo) { 
                        return todo.name == name; 
                    });
            }
    }
}());