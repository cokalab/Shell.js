/**
 * Generate unique component ID
 * 
 * @module Component/Id
 */
Sheru.include('Component/Id', null, function() {
	
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
			return 'Sheru-' + counter;
		}
		
	};
	
});