Shell.include('Util.Namespace', null, function() {

    /**
     * Export method under Shell namespace
     * If an existing method already exists, exception is thrown
     * Ex: method exports under "execute" becomes "Shell.execute"
     * 
     * @method
     * @param namespace {string} Namespace to create. 
     * @param method {function} Method to export.
     */
    var exportMethod = function(namespace, method) {
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
    };
    
    // Public interfaces
    return {
        exportMethod: exportMethod
    }
    
});