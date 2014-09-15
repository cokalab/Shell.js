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
			if(typeof data == type && data !== null) {
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
		
		/**
		 * Validate data structure
		 * 
		 * @method
		 * @param structure {?(object | string)} Expected data structure
		 * @param data {?(object | string | number | boolean | object)} Actual data to be validated.
		 */
		validate: function (structure, data) {
			if(typeof structure == 'undefined' || structure === null || structure === 'null') {
				if(typeof data == 'undefined' || data === null) {
					return true;
				}
				else {
					return false;
				}
			}
			else if(typeof structure == 'string') {
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
		},
		
		/**
		 * Validate data structure and throw an exception if data is not validated
		 * 
		 * @method
		 * @param structure {?(object | string)} Expected data structure
		 * @param data {?(object | string | number | boolean | object)} Actual data to be validated.
		 * @param errorMsg {string} Error to be thrown 
		 */
		validateAndThrow: function(structure, data, errorMsg) {
			if(!this.validate(structure, data)) {
				throw errorMsg;
			}
		}
	}

});