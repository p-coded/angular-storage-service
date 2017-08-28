(function () {
    "use strict";

    angular.module('app.localstorage')
            .config(LocalStorageConfiguration);

    LocalStorageConfiguration.$inject = ['$routeProvider'];
    
    function LocalStorageConfiguration($routeProvider)
    {
        $routeProvider.when('/localstorage', {
            templateUrl: 'views/localstorage/localstorage.view.html',
            controller: 'LocalStorageController',
            controllerAs: 'lsvm',
            reloadOnSearch: false
        });
    }

})();