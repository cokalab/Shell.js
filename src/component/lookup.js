/**
 * Look up component(s) by id, class, or any additional tags.
 * 
 * @module Component/Lookup
 * @requires module:Util/Logger
 */
Shell.include('Component/Lookup', ['Util/Logger', 'Util/Registry'], function(Logger, Registry) {
	
	var LookupRegistry = new Registry('Component/Lookup');
	var ReversedLookupRegistry = new Registry('Component/Lookup/Reversed');
	
	/**
	 * Internal method to register a lookup key to an id. Lookup key will be both class and id itself.
	 */
	var _register = function(id, key) {
		var ids;
		if(!LookupRegistry.exist(key)) {
			LookupRegistry.set(key, []);
		}
		ids = LookupRegistry.get(key);
		if(ids.indexOf(id) < 0) {
			ids.push(id);
		}
		LookupRegistry.set(key, ids);		
	}
	
	return {
	
		/**
		 * Register an ID and its class for future lookup
		 * 
		 * @method
		 * @static
		 * @param id {string}
		 * @param class {string}
		 */
		register: function(id, clazz) {
			if(ReversedLookupRegistry.exist(id)) {
				throw 'ID is already registered.';
			}
			_register(id, id);
			_register(id, clazz);
			ReversedLookupRegistry.set(id, clazz);
			Logger.debug('Registered lookup information.', {'id': id, 'class': clazz})
		},
		
		/**
		 * Lookup an ID with a selector string. 
		 * 
		 * @method
		 * @static
		 * @param selector {string} Selector can either be a component ID or class name.
		 * @return id {string[]}
		 */
		lookup: function(selector) {
			if(LookupRegistry.exist(selector)) {
				return LookupRegistry.get(selector);
			}
			else {
				return [];
			}
		},

		/**
		 * Get all IDs registered to the lookup module
		 * 
		 * @method
		 * @static
		 * @return id {string[]}
		 */
		getAll: function() {
			return ReversedLookupRegistry.getKeys();
		},
		
		/**
		 * Remove lookup information
		 * 
		 * @method
		 * @static
		 * @param id {string}
		 */
		remove: function(id) {
			var clazz = ReversedLookupRegistry.get(id);
			if(!clazz) {
				return;
			}
			ReversedLookupRegistry.remove(id);
			LookupRegistry.remove(id);
			ids = LookupRegistry.get(clazz);
			var pos = ids.indexOf(id);
			if(pos >= 0) {
				ids.splice(pos, 1);
				if(ids.length > 0) {
					LookupRegistry.set(clazz, ids);
				}
				else {
					LookupRegistry.remove(clazz);
				}
			}
			Logger.debug('Removed lookup information.', {'id': id, 'class': clazz})
		}
		
	};
	
});