/**
 * Event class
 * 
 * @module Event/Event
 */ 
Shell.include('Event/Event', null, function() {
    "use strict";
    
	/**
	 * @class
	 * @param channel {string}
	 * @param action {string}
	 * @param payload {?(string|boolean|number|object)} 
	 * @alias module:Event/Event
	 */
	var Event = function(channel, action, payload) {
		
		/**
		 * Get channel
		 * 
		 * @method
		 * @return channel name {string}
		 */
		this.getChannel = function() {
			return channel;
		};

		/**
		 * Get action
		 * 
		 * @method
		 * @return action type {string}
		 */
		this.getAction = function() {
			return action;
		};

		/**
		 * Get payload
		 * 
		 * @method
		 * @return payload {?(string|boolean|number|object)}
		 */
		this.getPayload = function() {
			return payload;
		};
		
	};
	
	return Event;
	
});