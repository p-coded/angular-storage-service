(function () {
    "use strict";

    angular.module('app.localstorage')
            .controller('LocalStorageController', LocalStorageController);

    LocalStorageController.$inject = ['$log', '$scope', '$timeout', 'LocalStorage'];

    function LocalStorageController($log, $scope, $timeout, LocalStorage)
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
            vm.prefix = LocalStorage.prefix();
            vm.constants.localstorage = [];
            vm.selected = vm.constants.localstorage.VALUE || undefined;
            vm.showAll();
        }
        
        ///////////////////////////////////////////////////////////////////////////////////
        
        function log()
        {
            $log.debug(LocalStorage.getAllItems());
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
            if (vm.constants.localstorage.indexOf(key) < 0 && angular.isDefined(key) && key !== "")
            {
                vm.constants.localstorage.push(key);

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
                LocalStorage.setItem(vm.currentKey, value);
                vm.originalValue = LocalStorage.getItem(vm.currentKey);
            }

            vm.showAll();
        }

        function posInArr(key)
        {
            return vm.constants.localstorage.indexOf(key.toUpperCase());
        }

        function loadByKey(key)
        {
            vm.currentKey = key;
            vm.addKey(key);
            vm.selected = vm.constants.localstorage[vm.posInArr(key)];
            vm.loadValue();
        }

        function loadValue()
        {
            vm.originalValue = LocalStorage.getItem(vm.currentKey);
            vm.value = LocalStorage.getItem(vm.currentKey);
        }

        function showAll()
        {
            vm.all = LocalStorage.getAllItems();

            for (var item in vm.all)
            {
                vm.addKey(vm.all[item].key);
            }
        }


        function clearAll()
        {
            LocalStorage.clearAll();
        }

        function deleteKey(key)
        {
            var key = key;
            var idx = vm.constants.localstorage.indexOf(key);
            $log.debug("Index of " + key, idx);
            vm.constants.localstorage.splice(idx, 1);
            LocalStorage.removeItem(key);
            vm.showAll();
        }
        
        //////////////////////////////////////////////////////////////////////////////////////
        
        $(document).ready(function () {
            vm.showAll();
        });
    }

})();