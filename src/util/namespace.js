/**
 * Namespace utilility. 
 * Provide ability to export methods and other objects under Shell's global namespace
 * 
 * @module Util/Namespace
 */
Shell.include('Util/Namespace', null, function() {

    // Public interfaces
    return {

        /**
         * Export method under Shell namespace
         * If an existing method already exists, exception is thrown
         * Ex: method exports under "execute" becomes "Shell.execute"
         * 
         * @public
         * @static
         * @method
         * @param namespace {string} Namespace to create. 
         * @param method {function} Method to export.
         */
        exportMethod: function(namespace, method) {
            if(typeof namespace != 'string' || !namespace) {
                throw 'Invalid namespace.';
            }
            if(typeof method != 'function' || !method) {
                throw 'Invalid method.';
            }
            var namespacedObj = Shell;
            var parts = namespace.split(".");
            for(var x=0; x<parts.length; x++) {
                if(typeof namespacedObj[parts[x]] == 'undefined' || namespacedObj[parts[x]] === null) {
                    if(x == parts.length - 1) {
                        if(typeof namespacedObj[parts[x]] == 'function') {
                            throw 'Namespace "' + namespace + '" is already in use.';
                        }
                        namespacedObj[parts[x]] = method;
                    }
                    else {
                        namespacedObj[parts[x]] = {};
                    }
                }
                namespacedObj = namespacedObj[parts[x]];
            }
        }
    
    }
    
});