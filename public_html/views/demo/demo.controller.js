(function () {
    "use strict";

    angular.module('app.demo')
            .controller('DemoController', DemoController);

    DemoController.$inject = ['$log', '$scope', '$rootScope'];

    function DemoController($log, $scope, $rootScope)
    {
        var vm = this;
        vm.title = "Meine Anwendung";
       
        
        //////////////////////////////////////////////////////////////////////////////////////

        (function init()
        {
            
        })();

        //////////////////////////////////////////////////////////////////////////////////////

        
    }
})();
