var Shell = {};

/**
 * Export method under Shell namespace
 * If an existing method already exists, exception is thrown
 * Ex: method exports under "execute" becomes "Shell.execute"
 * 
 * @method
 * @param namespace {string} Namespace to create. 
 * @param method {function} Method to export.
 */
Shell.exportMethod = function(namespace, method) {
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

/**
 * Include a module into the Core library
 * Module included via this method has access to all of the core components. Please use with caution.
 * Each module requires an unique ID, a list of dependencies, and a factory method.
 * A module retrieves other core modules by passing their module IDs as a list of dependencies.
 * When the factory method is invoked, dependencies are passed in as arguments.
 * 
 * @method
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
	
	// Internal method to refresh all modules, update dependencies, and initialize modules when something changes.
	var refresh = function() {
		var moduleInstantiated = false;
		// Loop through all registered module and attempt to instantiate any module that is not instantiated already.
		for(var id in modules) {
			var module = modules[id];
			if(!module.instance) {
				var dependencyReady = true;
				var args = [];
				// Loop through all dependencies of the current module and push dependency instant into an argument array.
				for(var x=0; x<module.dependencies.length; x++) {
					var dependency = module.dependencies[x];
					if(modules[dependency].instance) {
						module.dependencies[dependency] = true;
						args.push(modules[dependency].instance);
					}
					else {
						// Break if one of the dependencies is not ready.
						dependencyReady = false;
						break;
					}
				}
				// Instantiate a new module and pass in all dependencies as arguments
				if(dependencyReady) {
					module.instance = module.constructor.apply({}, args) || {};
					moduleInstantiated = true;
				}
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

