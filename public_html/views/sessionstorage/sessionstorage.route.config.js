(function () {
    "use strict";

    angular.module('app.sessionstorage')
            .config(SessionStorageConfiguration);

    SessionStorageConfiguration.$inject = ['$routeProvider'];
    
    function SessionStorageConfiguration($routeProvider)
    {
        $routeProvider.when('/sessionstorage', {
            templateUrl: 'views/sessionstorage/sessionstorage.view.html',
            controller: 'SessionStorageController',
            controllerAs: 'ssvm',
            reloadOnSearch: false
        });
    }

})();