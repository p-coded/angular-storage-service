(function () {
    "use strict";

    angular.module('pStorage.services')
            .provider('SessionStorage', SessionStorageServiceProvider);

    function SessionStorageServiceProvider()
    {
        var sessionStoragePrefix = "yourapp.";
        var errorMessage = "[SessionStorageService] SessionStorage is not supported";

        Service.$inject = ['$log'];

        return {
            setPrefix: setPrefix,
            $get: Service
        };

        function Service($log) {

            // Private
            var isSessionStorageAvailable = isSessionStorageAvailable;
            var convertUserKeyToKey = convertUserKeyToKey;
            var convertKeyToUserKey = convertKeyToUserKey;

            var service = {
                isSupported: isSessionStorageAvailable(),
                prefix: getSessionStoragePrefix,
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
                if (getSessionStoragePrefix() && angular.isDefined(key))
                {
                    var theKey = getSessionStoragePrefix().concat(key);
                    sessionStorage.setItem(theKey, JSON.stringify(value));
                } else if (!getSessionStoragePrefix())
                {
                    throw new Error(errorMessage);
                } else
                {
                    throw new Error("Schlüssel nicht definiert");
                }
            }

            function getKeys()
            {
                if (getSessionStoragePrefix())
                {
                    var keys = [];

                    for (var i = 0; i < sessionStorage.length; i++)
                    {
                        var key = sessionStorage.key(i);

                        if (key.startsWith(getSessionStoragePrefix()))
                        {
                            keys.push(convertKeyToUserKey(key));
                        }
                    }

                    return keys;
                }
            }

            function getAllItems()
            {
                if (getSessionStoragePrefix())
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
                if (getSessionStoragePrefix())
                {
                    var itemValue = sessionStorage.getItem(convertUserKeyToKey(key));

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
                if (getSessionStoragePrefix())
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
                if (getSessionStoragePrefix())
                {
                    var itemValue = getItem(key);
                    sessionStorage.removeItem(convertUserKeyToKey(key));
                    return itemValue;
                }
                throw new Error(errorMessage);
            }

            function clear()
            {
                if (getSessionStoragePrefix())
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
                if (getSessionStoragePrefix())
                {
                    sessionStorage.clear();
                    return;
                } else
                    throw new Error(errorMessage);
            }

            function isSessionStorageAvailable()
            {
                try {
                    return ('sessionStorage' in window && window['sessionStorage'] !== null);
                } catch (e)
                {
                    return false;
                }
            }

            function getSessionStoragePrefix()
            {
                return sessionStoragePrefix;
            }

            function convertUserKeyToKey(userKey)
            {
                var key = sessionStoragePrefix.concat(userKey);
                return key;
            }

            function convertKeyToUserKey(key)
            {
                var userKey = key.substr(sessionStoragePrefix.length, key.length - 1);
                return userKey;
            }
        }

        function setPrefix(newPrefix)
        {

            if (newPrefix && angular.isDefined(newPrefix))
            {
                if (angular.isString(newPrefix))
                    sessionStoragePrefix = newPrefix + ".";
                else
                    sessionStoragePrefix = newPrefix.toString() + ".";
            }
        }
    }
})();