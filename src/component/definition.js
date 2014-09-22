/**
 * Store and manage component configuration.
 * 
 * @module Component/Definition
 * @requires module:Util/Registry
 * @requires module:Util/Logger
 */
Shell.include('Component/Definition', ['Util/Registry', 'Util/Logger'], function(Registry, Logger) {
    "use strict";
    
	var requiredDefinitionFields = [];
	
	var DefintionRegistry = new Registry('Component/definition');
	
	return {
		
		/**
		 * Add required field that must be included in component definition.
		 * This is useful if plug-in needs additional fields.
		 * 
		 * @method
		 * @static
		 * @param field {string} Additional required field
		 */
		addRequiredDefinitionField: function(field) {
			if(requiredDefinitionFields.indexOf(field.toLowerCase()) < 0) {
				requiredDefinitionFields.push(field);
				Logger.debug('Set component definition required field.', {field: field});
			}
		},
		
		/**
		 * Get component definition
		 * 
		 * @method
		 * @static
		 * @param clazz {string} Component class name
		 * @return definition {object}
		 */
		get: function(clazz) {
			return DefintionRegistry.get(clazz);
		},

		/**
		 * Set component definition
		 * 
		 * @method
		 * @static
		 * @param clazz {string}
		 * @param definition {object} Component definition
		 */
		set: function(clazz, config) {
			for(var x=0; x<requiredDefinitionFields.length; x++) {
				var field = requiredDefinitionFields[x];
				if(typeof config[field] == 'undefined' || config[field] === null) {
					throw 'Required field ' + field + ' is not found in component definition.';
				}
			}
			DefintionRegistry.set(clazz, config);
			Logger.debug('Set component definition.', {clazz: clazz, config: config});
		}
		
	};
	
});