/**
 * Validator utilility.
 * Provide ability to validate the type of payload
 *
 * @module Util/Validator
 */
Shell.include('Util/Validator', null, function () {

	var structureMatches = function (structure, data) {
		matches = true;
		for (var el in structure) {
			if (!(el in data)) {
				matches = false;
				break;
			}
			else if (typeof structure[el] == 'object') {
				matches = structureMatches(structure[el], data[el]);
				if (!matches) {
					break;
				}
			}
			else if (typeof data[el] !== structure[el]) {
				matches = false;
				break;
			}
		}
		return matches;
	}

	// Public interfaces
	return {
		/**
		 * Compares the data passed with the expected data structure and type
		 * If an existing method already exists, exception is thrown
		 * Ex: method exports under "execute" becomes "Shell.execute"
		 *
		 * @public
		 * @static
		 * @method
		 * @param expectedStructure {object} The expected data structure with types
		 * @param data {object} Actual data to be validated.
		 * @return {boolean}
		 */
		validate: function (expectedStructure, data) {
			return structureMatches(expectedStructure, data);
		}
	}

});