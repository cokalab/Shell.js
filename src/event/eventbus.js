/**
 * Event bus provides publisher subscription style communication.
 * 
 * @module Event/EventBus
 * @requires module:Event/Event
 * @requires module:Event/Listener
 * @requires module:Util/Logger
 */
Shell.include('Event/EventBus', ['Event/Event', 'Event/Listener', 'Util/Logger'], function(Event, Listener, Logger) {
	
	/**
	 * Event bus implementation (singleton)
	 */
	var EventBus = new function(){
		
		// Listener storage
		var listeners = {};
		
		/**
		 * Trigger an event.
		 * All listeners registered to this event are executed in sequence.
		 * 
		 * @method
		 * @param channel {string}
		 * @param action {string}
		 * @param payload {?(string|number|boolean|object)}
		 */
		this.trigger = function(channel, action, payload) {
			if(listeners[channel] && listeners[channel][action]) {
				var iListeners = listeners[channel][action];
				for(var index in iListeners) {
					iListeners[index].execute(new Event(channel, action, payload));
				}
			}
			Logger.debug('Triggered event', {channel: channel, action: action, payload: payload});
		};
		
		/**
		 * Add a new listener.
		 * 
		 * @method
		 * @param channel {string}
		 * @param action {string}
		 * @param callback {function}
		 * @param context {string|boolean|number|object}
		 */
		this.addListener = function(channel, action, callback, context) {
			listeners[channel] = listeners[channel] || {};
			listeners[channel][action] = listeners[channel][action] || [];
			listeners[channel][action].push(new Listener(callback, context));
			Logger.debug('Added listener', {channel: channel, action: action, callback: callback, context: context});
		};

		/**
		 * Remove a listener.
		 * 
		 * @method
		 * @param channel {string}
		 * @param action {?string}
		 * @param callback {function}
		 * @param context {string|boolean|number|object}
		 */
		this.removeListener = function(channel, action, callback, context) {
			if(listeners[channel] && listeners[channel][action]) {
				var iListeners = listeners[channel][action];
				for(var x=0; x<iListeners.length; x++) {
					if(iListeners[x].compare(callback, context)) {
						iListeners.splice(x, 1);
					}
				}
			}
			Logger.debug('Removed listener', {channel: channel, action: action, callback: callback, context: context});
		};

		/**
		 * Remove listeners.
		 * 
		 * @method
		 * @param channel {string}
		 * @param action {?string}
		 */
		this.removeListeners = function(channel, action) {
			if(action) {
				if(listeners[channel] && listeners[channel][action]) {
					listeners[channel][action] = null;
				}
			}
			else {
				listeners[channel] = {};
			}
			Logger.debug('Removed listener', {channel: channel, action: action});
		};
		
		/**
		 * Determine if an listener exists.
		 * 
		 * @method
		 * @param channel {string}
		 * @param action {?string}
		 * @param callback {function}
		 * @param context {string|boolean|number|object}
		 * @return boolean
		 */
		this.isListener = function(channel, action, callback, context) {
			if(listeners[channel] && listeners[channel][action]) {
				var iListeners = listeners[channel][action];
				for(var index in iListeners) {
					if(iListeners[index].compare(callback, context)) {
						return true;
					}
				}
			}
			return false;
		};
		
		/**
		 * Reset, remove all listeners
		 * 
		 * @method
		 */
		this.reset = function() {
			listeners = {};
		};

	}();
	return EventBus
	
});