var Shell = {};

Shell.exportMethod = function(namespace, method) {
	if(typeof namespace != 'string' || !namespace) {
		throw 'Invalid namespace.';
	}
	if(typeof method != 'function') {
		throw 'Invalid method.';
	}
	var namespacedObj = Shell;
	var parts = namespace.split(".");
	for(var x=0; x<parts.length; x++) {
		if(namespacedObj[parts[x]] == null) {
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

Shell.include = (function() {

	var Module = function(id, dependencies, constructor) {
		var ready = false;
		var dependencyReady = {};
		if(dependencies) {
			for(var x=0; x<dependencies.length; x++) {
				dependencyReady[dependencies[x]] = false;
			}
		}
		
		this.update = function(dependency) {
			dependencyReady[dependency] = true;
		};
		
		this.isReady = function() {
			for(var key in dependencyReady) {
				if(!dependencyReady(key)) {
					return false;
				}
			}
			return true;
		};
		
		this.initialize = function() {
			return constructor();
		};
		
	};
	
	var modules = {};
	
	var refresh = function() {
		
	};
	
	return function(id, dependencies, module) {
		var module = new Module(id, dependencies, module);
		modules[id] = module;
	};
	
})();

