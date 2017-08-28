(function () {
    "use strict";

    angular.module('app.sessionstorage')
            .controller('SessionStorageController', SessionStorageController);

    SessionStorageController.$inject = ['$log', '$scope', '$timeout', 'SessionStorage'];

    function SessionStorageController($log, $scope, $timeout, SessionStorage)
    {
        var vm = this;
        
        vm.prefix = '';
        vm.selected = '';
        vm.value = undefined;
        vm.originalValue = undefined;
        vm.constants = {};
        
        vm.isObject = isObject;
        vm.isArray = isArray;
        vm.addKey = addKey;
        vm.doChange = doChange;
        vm.storeValue = storeValue;
        vm.posInArr = posInArr;
        vm.loadByKey = loadByKey;
        vm.loadValue = loadValue;
        vm.showAll = showAll;
        vm.clearAll = clearAll;
        vm.deleteKey = deleteKey;
        vm.log = log;

        
        activate();
        
        function activate()
        {
            vm.prefix = SessionStorage.prefix();
            vm.constants.sessionstorage = [];
            vm.selected = vm.constants.sessionstorage.VALUE || undefined;
            vm.showAll();
        }
        
        ///////////////////////////////////////////////////////////////////////////////////
        
        function log()
        {
            $log.debug(SessionStorage.getAllItems());
        }
        
        function isObject(value)
        {
            if (value && angular.isObject(value))
            {
                return true;
            } else
                return false;
        }
        
        function isArray(value)
        {
            if (value && angular.isArray(value))
            {
                return true;
            } else
                return false;
        }

        function addClassTo(element, className)
        {
            if (element && angular.isDefined(element) && className && angular.isDefined(className))
            {
                $(element).addClass(className);

                $timeout(function () {
                    $(element).removeClass(className);
                }, 750);
            }
        }

        // Fügt einen neuen Schlüssel in die Liste der 
        function addKey(key, event)
        {
            if (angular.isDefined(key) && vm.constants.sessionstorage.indexOf(key) < 0 && key !== "")
            {
                vm.constants.sessionstorage.push(key);

                vm.selected = key;
                vm.doChange(vm.selected);

                if (event && angular.isDefined(event))
                    addClassTo(event.currentTarget, 'btn-success');
            } else
            {
                if (event && angular.isDefined(event))
                    addClassTo(event.currentTarget, 'btn-warning');
            }

            vm.key = "";
        }

        function doChange(selected)
        {
            vm.currentKey = selected;
            vm.loadValue();
        }

        function storeValue(value)
        {
            if (value && angular.isDefined(value))
            {
                SessionStorage.setItem(vm.currentKey, value);
                vm.originalValue = SessionStorage.getItem(vm.currentKey);
            }

            vm.showAll();
        }

        function posInArr(key)
        {
            return vm.constants.sessionstorage.indexOf(key.toUpperCase());
        }

        function loadByKey(key)
        {
            vm.currentKey = key;
            vm.addKey(key);
            vm.selected = vm.constants.sessionstorage[vm.posInArr(key)];
            vm.loadValue();
        }

        function loadValue()
        {
            vm.originalValue = SessionStorage.getItem(vm.currentKey);
            vm.value = SessionStorage.getItem(vm.currentKey);
        }

        function showAll()
        {
            vm.all = SessionStorage.getAllItems();

            for (var item in vm.all)
            {
                vm.addKey(vm.all[item].key);
            }
        }


        function clearAll()
        {
            SessionStorage.clearAll();
        }

        function deleteKey(key)
        {
            var key = key;
            var idx = vm.constants.sessionstorage.indexOf(key);
            $log.debug("Index of " + key, idx);
            vm.constants.sessionstorage.splice(idx, 1);
            SessionStorage.removeItem(key);
            vm.showAll();
        }
        
        //////////////////////////////////////////////////////////////////////////////////////
        
        $(document).ready(function () {
            vm.showAll();
        });
    }

})();