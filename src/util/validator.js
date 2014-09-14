/**
 * Validator utilility.
 * Provide ability to validate the type of payload
 *
 * @module Util/Validator
 */
Shell.include('Util/Validator', null, function () {

	/**
	 * Return native validation method
	 * 
	 * @method
	 * @private
	 * @param type {string} string, number, boolean, array, or object
	 * @return validation method {function}
	 */
	var getNativeTypeValidator = function(type) {
		return function(data) {
			if(typeof data == type) {
				return true;
			}
			return false;
		};
	};

	/**
	 * Validation rules. This can be extended to support jquery and other type of variables
	 */
	var rules = {};
	rules['string'] = getNativeTypeValidator('string');
	rules['number'] = getNativeTypeValidator('boolean');
	rules['boolean'] = getNativeTypeValidator('boolean');
	rules['array'] = getNativeTypeValidator('array');
	rules['object'] = getNativeTypeValidator('object');
	
	// Public interfaces
	return {
		
		validate: function (structure, data) {
			if(typeof structure == 'string') {
				var validator = rules[structure];
				return validator(data);
			}
			else if(typeof structure == 'object' && typeof data == 'object'){
				for(var key in data) {
					if(typeof structure[key] == 'undefined' || structure[key] === null) {
						return false;
					}
					var validated = this.validate(structure[key], data[key]);
					if(!validated) {
						return false;
					}
				}
				return true;
			}
			return false;
		}
	}

});