/**
 * Listener class
 * 
 * @module Event/Listener
 * @requires module:Event/Event
 */
Shell.include('Event/Listener', ['Event/Event'], function() {

	/**
	 * @class
	 * @param callback {function}
	 * @param context {string|number|boolean|object}
	 * @alias module:Event/Listener
	 */
	var Listener = function(callback, context) {

		/**
		 * Compare callback and context belong to the listener to another
		 * callback and context combination. Return true if they are the same
		 * 
		 * @method
		 * @param iCallback {function} Callback function to compare
		 * @param iContext {{string|number|boolean|object}} Context to compare
		 * @return {boolean} True if both callback and context match; false otherwise.
		 */
		this.compare = function(iCallback, iContext) {
			if (callback === iCallback && context === iContext) {
				return true;
			}
			return false;
		};

		/**
		 * Execute callback under the context provided in the constructor. Data
		 * is directly passed to the callback function.
		 * 
		 * @method
		 * @param event {module:Event/Event}
		 */
		this.execute = function(event) {
			callback.call(context, event.getPayload());
		};

	};
	
	return Listener;
	
});