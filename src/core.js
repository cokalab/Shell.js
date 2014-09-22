/**
 * @global
 * @namespace Shell
 */
/**
 * @namespace Shell.debug
 * @memberof Shell
 */
var Shell = {};

/**
 * Include a module into the Core library
 * Module included via this method has access to all of the core components. Please use with caution.
 * Each module requires an unique ID, a list of dependencies, and a factory method.
 * A module retrieves other core modules by passing their module IDs as a list of dependencies.
 * When the factory method is invoked, dependencies are passed in as arguments.
 *
 * @memberOf Shell
 * @method include
 * @param id {string} Module ID
 * @param dependencies {string[]} Dependency module IDs.
 * @param constructor {function} Factory constructor method. The return value is stored as the dependency instance.
 */
Shell.include = (function() {

    // Module class
    var Module = function(id, dependencies, constructor) {
        this.id = id;
        this.dependencies = dependencies;
        this.constructor = constructor;
        this.instance = null;
    };
    
    // Internal module storage
    var modules = {};
    
    // Attempt to instantiate a module.
    // Return true if module is instantiated; false otherwise.
    var instantiate = function(id) {
        var module = modules[id];
        var dependencyReady = true;
        var args = [];
        // Loop through all dependencies of the current module and push dependency into an argument array.
        for(var x=0; x<module.dependencies.length; x++) {
            var dependency = module.dependencies[x];
            if(modules[dependency] && modules[dependency].instance) {
                module.dependencies[dependency] = true;
                args.push(modules[dependency].instance);
            }
            else {
                // Return false if a dependency is not ready yet.
                return false;
            }
        }
        // Instantiate the current module with all dependencies passed in as arguments
        module.instance = module.constructor.apply({}, args);
        module.instance = typeof module.instance != 'undefined' && module.instance !== null ? module.instance : {};
        return true;
    };
    
    // Internal method to refresh all modules, update dependencies, and initialize modules when something changes.
    var refresh = function() {
        var moduleInstantiated = false;
        // Loop through all registered module and attempt to instantiate any module that is not instantiated already.
        for(var id in modules) {
            if(!modules[id].instance) {
                moduleInstantiated = moduleInstantiated || instantiate(id) ? true: false;
            }
        }
        // Refresh again if any module is instantiated.
        if(moduleInstantiated) {
            refresh();
        }
    };
    
    // Return method implementation
    return function(id, dependencies, constructor) {
        // Parameter validations
        if(typeof id != 'string' || !id) {
            throw 'Invalid ID. ID must be a string.';
        }
        if(modules[id]) {
            throw 'Module ID is already in use.';
        }
        if(dependencies && Object.prototype.toString.call(dependencies) !== '[object Array]') {
            throw 'Invalid dependencies. Dependencies can be null or an array of IDs.';
        }
        if(typeof constructor != 'function') {
            throw 'Invalid factory constructor function.';
        }
        // Set up module.
        var module = new Module(id, dependencies || [], constructor);
        modules[id] = module;
        // Refresh and attempt to initialize modules. 
        refresh();
    };
    
})();