(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todoLists', todoLists);

    function todoLists() {
        var directive = {
            templateUrl: './states/todoLists/todoLists.html',
            restrict: 'E',
             controller: controller
        };
        return directive;
    }

    /** @ngInject */
    function controller($scope) {
        $scope.isTodoListInputHidden = true;
        $scope.newTodoListName = '';

        $scope.addTodoList = function() {
            $scope.isTodoListInputHidden = false;

            var newTodoListName = $scope.newTodoListName;

            if (newTodoListName !== '') {
                 // return todoLists.addList(newTodoListName);
                
            }
        };
    }
}());