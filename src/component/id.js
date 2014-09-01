/**
 * Generate unique component ID
 * 
 * @module Component/Id
 */
Shell.include('Component/Id', null, function() {
	
	var counter = 0;
	
	return {

		/**
		 * Generate an unique ID
		 * @method
		 * @static
		 * @return {string}
		 */
		generate: function() {
			counter ++;
			return 'Shell-' + counter;
		}
		
	};
	
});