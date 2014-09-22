/**
 * Listener class, containing a callback method and a context.
 * 
 * @module Event/Listener
 * @requires module:Event/Event
 */
Shell.include('Event/Listener', ['Event/Event'], function() {
    "use strict";
    
	/**
	 * @class
	 * @param callback {function}
	 * @param context {string|number|boolean|object}
	 * @param onetime {?boolean}
	 * @alias module:Event/Listener
	 */
	var Listener = function(callback, context, oneTime) {

		/**
		 * Compare current listener's callback and context to another callback and context combination. 
		 * Return true if they are the same.
		 * 
		 * @method
		 * @param iCallback {function} Callback method to compare
		 * @param iContext {{string|number|boolean|object}} Context to compare
		 * @return {boolean} True if both callback and context match; false otherwise.
		 */
		this.compare = function(iCallback, iContext) {
			if (callback === iCallback && context == iContext) {
				return true;
			}
			return false;
		};

		/**
		 * Execute callback method under current listener's context.
		 * 
		 * @method
		 * @param event {module:Event/Event}
		 */
		this.execute = function(event) {
			callback.call(context, event.getPayload());
		};

		/**
		 * Return true if this listener is one time use only
		 * 
		 * @method
		 * @return {boolean}
		 */
		this.isOneTime = function() {
			return !!oneTime;
		};
		
	};
	
	return Listener;
	
});