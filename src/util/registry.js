/**
 * Registry class
 * Base class for storing key value pair data.
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
		 * Get an object from registry
		 * 
		 * @method
		 * @param key {string} Key associated with the object we want to fetch.
		 * @returns object {object} Object matching the key provided; null otherwise.
		 */
		this.get = function(key) {
			return storage[key] || null;
		};

		/**
		 * Set a key value pair
		 * 
		 * @method
		 * @param key {string} Key associated with the object we want to fetch.
		 * @param object {object} Object we want to store.
		 */
		this.set = function(key, object) {
			storage[key] = object;
			Logger.debug('Set ' + key + ' to ' + object + ' in registry ' + name);
		};

		/**
		 * Remove a key value pair
		 * 
		 * @method
		 * @param key {string} Key associated with the object we want to remove.
		 */		
		this.remove = function(key) {
			storage [key] = null;
			Logger.debug('Removed ' + key + ' from registry ' + name);
		};

		/**
		 * Determine if an object exists in the storage for the key provided
		 * 
		 * @method
		 * @param key {string} Key associated with the object we want to remove.
		 * @returns {boolean} True if object exists; false otherwise.
		 */		
		this.exist = function(key) {
			if(typeof storage[key] == 'undefined' || storage[key] === null) {
				return false;
			}
			return true;
		}
		
	};
	
	// Return Registry class.
	return Registry;
	
});