(function () {
    "use strict";

    angular.module('pStorage.services')
            .provider('LocalStorage', LocalStorageServiceProvider);

    function LocalStorageServiceProvider()
    {
        var localStoragePrefix = "yourapp.";
        var errorMessage = "[LocalStorageService] LocalStorage is not supported";

        Service.$inject = ['$log'];

        return {
            setPrefix: setPrefix,
            $get: Service
        };

        function Service($log) {

            // Private
            var isLocalStorageAvailable = isLocalStorageAvailable;
            var convertUserKeyToKey = convertUserKeyToKey;
            var convertKeyToUserKey = convertKeyToUserKey;

            var service = {
                isSupported: isLocalStorageAvailable(),
                prefix: getLocalStoragePrefix,
                setItem: setItem,
                getKeys: getKeys,
                getAllItems: getAllItems,
                getItem: getItem,
                getItemAndRemove: getItemAndRemove,
                getItemKeyValue: getItemKeyValue,
                removeItem: removeItem,
                clear: clear,
                clearAll: clearAll
            };

            return service;

            /////////////////////////////////////////////////////////////////////

            function setItem(key, value)
            {
                if (isLocalStorageAvailable() && angular.isDefined(key))
                {
                    var theKey = getLocalStoragePrefix().concat(key);
                    localStorage.setItem(theKey, JSON.stringify(value));
                } else if (!isLocalStorageAvailable())
                {
                    throw new Error(errorMessage);
                } else
                {
                    throw new Error("Schlüssel nicht definiert");
                }
            }

            function getKeys()
            {
                if (isLocalStorageAvailable())
                {
                    var keys = [];

                    for (var i = 0; i < localStorage.length; i++)
                    {
                        var key = localStorage.key(i);

                        if (key.startsWith(getLocalStoragePrefix()))
                        {
                            keys.push(convertKeyToUserKey(key));
                        }
                    }

                    return keys;
                }
            }

            function getAllItems()
            {
                if (isLocalStorageAvailable())
                {
                    var items = [];
                    var keys = getKeys();

                    for (var i = 0; i < keys.length; i++)
                    {
                        var value = getItem(keys[i]);
                        items.push({'key': keys[i], 'value': value});
                    }

                    return items;
                }
                throw new Error(errorMessage);
            }

            function getItem(key)
            {
                if (isLocalStorageAvailable())
                {
                    var itemValue = localStorage.getItem(convertUserKeyToKey(key));

                    if (itemValue && angular.isDefined(itemValue))
                        return JSON.parse(itemValue);

                    else
                        return;
                }

                throw new Error(errorMessage);
            }
            
            function getItemAndRemove(key)
            {
                var value = getItem(key);
                removeItem(key);
                return value;
            }

            function getItemKeyValue(key)
            {
                if (isLocalStorageAvailable())
                {
                    var items = getAllItems();

                    for (var i = 0; i < items.length; i++)
                    {
                        if (items[i].key === key)
                        {
                            return items[i];
                        }
                    }

                    return;
                }

                throw new Error(errorMessage);
            }

            function removeItem(key)
            {
                if (isLocalStorageAvailable())
                {
                    var itemValue = getItem(key);
                    localStorage.removeItem(convertUserKeyToKey(key));
                    return itemValue;
                }
                throw new Error(errorMessage);
            }

            function clear()
            {
                if (isLocalStorageAvailable())
                {
                    var keys = getKeys();

                    for (var i = 0; i < keys.length; i++)
                    {
                        var x = removeItem(keys[i]);
                    }
                }
            }

            function clearAll()
            {
                if (isLocalStorageAvailable())
                {
                    localStorage.clear();
                    return;
                } else
                    throw new Error(errorMessage);
            }

            function isLocalStorageAvailable()
            {
                try {
                    return ('localStorage' in window && window['localStorage'] !== null);
                } catch (e)
                {
                    return false;
                }
            }

            function getLocalStoragePrefix()
            {
                return localStoragePrefix;
            }

            function convertUserKeyToKey(userKey)
            {
                var key = localStoragePrefix.concat(userKey);
                return key;
            }

            function convertKeyToUserKey(key)
            {
                var userKey = key.substr(localStoragePrefix.length, key.length - 1);
                return userKey;
            }
        }

        function setPrefix(newPrefix)
        {

            if (newPrefix && angular.isDefined(newPrefix))
            {
                if (angular.isString(newPrefix))
                    localStoragePrefix = newPrefix + ".";
                else
                    localStoragePrefix = newPrefix.toString() + ".";
            }
        }
    }
})();