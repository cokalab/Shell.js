/**
 * Internal registry for storing data. 
 * Registry is basically a key / object pair storage.
 * It's recommended to create a new Registry instance for different usage.
 * 
 * @module Util/Registry
 * @requires Util/Logger
 */
Shell.include('Util/Registry', ['Util/Logger'], function(Logger) {
	
	/**
	 * @class
	 * @param name {string} Registry name
	 * @alias module:Util/Registry
	 */
	var Registry = function(name) {
		
		// Validate registry name
		if(typeof name != 'string' || !name) {
			throw 'Invalid registry name.';
		}
		
		// Key value pair storage
		var storage = {};
		
		/**
		 * Retrieve an object
		 * 
		 * @method
		 * @param key {string} 
		 * @returns object {object}
		 */
		this.get = function(key) {
			return storage[key] || null;
		};

		/**
		 * Registry an object.
		 * 
		 * @method
		 * @param key {string}
		 * @param object {object}
		 */
		this.set = function(key, object) {
			storage[key] = object;
			Logger.debug('Set ' + key + ' to ' + object + ' in registry ' + name);
		};

		/**
		 * Remove an object
		 * 
		 * @method
		 * @param key {string}
		 */		
		this.remove = function(key) {
			delete storage[key];
			Logger.debug('Removed ' + key + ' from registry ' + name);
		};

		/**
		 * Determine if an object is registered or not.
		 * 
		 * @method
		 * @param key {string}
		 * @returns {boolean}
		 */		
		this.exist = function(key) {
			if(typeof storage[key] == 'undefined' || storage[key] === null) {
				return false;
			}
			return true;
		};
		
		/**
		 * Reset registry
		 * 
		 * @method
		 */
		this.reset = function() {
			for(var key in storage) {
				this.remove(key);
			}
		};
		
		/**
		 * Monitor memory usage.
		 * Return the total number registered objects.
		 * 
		 * @method
		 * @return stats {object} 
		 */
		this.monitor = function() {
			var total = 0;
			for(var key in storage) {
				total ++;
			}
			return {
				total: total 
			};
		}
		
	};
	
	// Return Registry class.
	return Registry;
	
});