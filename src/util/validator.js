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
	var getNativeTypeValidator = function(type, nullable) {
		return function(data) {
		    if(nullable && (typeof data == 'undefined' || data === null)) {
		        return true;
		    }
			if(typeof data == type && data !== null) {
				return true;
			}
			return false;
		};
	};

    /**
     * Validate against DOM element
     * 
     * @method
     * @private
     * @param data {object}
     */
    var validateDomElement = function(data) {
        try {
            return data instanceof HTMLElement;
        }
        catch(e) {
            return data.nodeType;
        }
    };

    /**
     * Validate against DOM element
     * 
     * @method
     * @private
     * @param data {object}
     */
    var validateNullableDomElement = function(data) {
        if(typeof data == 'undefined' || data == null) {
            return true;
        }
        else {
            return validateDomElement(data);
        }
    };

	/**
	 * Validation rules. This can be extended to support jquery and other type of variables
	 */
	var rules = {};
	rules.string = getNativeTypeValidator('string', false);
	rules.number = getNativeTypeValidator('number', false);
	rules.boolean = getNativeTypeValidator('boolean', false);
	rules.array = getNativeTypeValidator('array', false);
	rules.object = getNativeTypeValidator('object', false);
    rules['?string'] = getNativeTypeValidator('string', true);
    rules['?number'] = getNativeTypeValidator('number', true);
    rules['?boolean'] = getNativeTypeValidator('boolean', true);
    rules['?array'] = getNativeTypeValidator('array', true);
    rules['?object'] = getNativeTypeValidator('object', true);
    rules.dom = validateDomElement;
    rules['dom|null'] = validateNullableDomElement;
	
	// Public interfaces
	return {
		
		/**
		 * Validate data structure
		 * 
		 * @method
		 * @param structure {?(object | string)} Expected data structure
		 * @param data {?any} Actual data to be validated.
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
                if(validator) {
                    return validator(data);
                }
                else {
                    return false;
                }
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
	};

});