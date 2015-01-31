/**
 * Event bus provides publisher subscription style communication.
 * 
 * @module Event/EventBus
 * @requires module:Event/Event
 * @requires module:Event/Listener
 * @requires module:Util/Logger
 */
Shell.include('Event/EventBus', ['Event/Event', 'Event/Listener', 'Util/Logger'], function(Event, Listener, Logger) {
	"use strict";
    
	/**
	 * Event bus implementation (singleton)
	 */
	var EventBus = (function(){

        // Interceptors storage
        var interceptors = [];
        
		// Listener storage
		var listeners = {};
    		
		// Wild card listener storage
		var wildCardListeners = [];
		
		return {
		
    		/**
    		 * Trigger an event.
    		 * All listeners registered to this event are executed in sequence.
    		 * 
    		 * @method
    		 * @param channel {string}
    		 * @param action {string}
    		 * @param payload {?(string|number|boolean|object)}
    		 * @param once {?boolean} If set to true, listener is removed right after. 
    		 */
    		trigger: function(channel, action, payload, once) {
                for(var a=0; a<interceptors.length; a++) {
                    var interceptor = interceptors[a];
                    var rsp = interceptor.callback.apply(interceptor.context, [new Event(channel, action, payload)]);
                    if(rsp.overwrite) {
                        payload = rsp.payload;
                    }
                }
    		    if(listeners[channel] && listeners[channel][action]) {
    				var iListeners = listeners[channel][action];
    				for(var x = 0; x<iListeners.length; x++) {
                        iListeners[x].execute(new Event(channel, action, payload));
    					if(iListeners[x].isOneTime()) {
    						iListeners.splice(x, 1);
    						x--;
    					}
    				}
    			}
    		    if(wildCardListeners && wildCardListeners.length > 0) {
    		        for (var x=0; x<wildCardListeners.length; x++) {
    		            wildCardListeners[x].execute(new Event(channel, action, payload));
    		        }
    		    }
    			Logger.debug('Triggered event', {channel: channel, action: action, payload: payload});
    		},
    		
    		/**
    		 * Add interceptor. 
    		 * Intercept all events traveling through the event bus and alter payload or stop the flow of events if necessary.
    		 * 
    		 * @method
    		 * @param callback {function}
             * @param context {string|boolean|number|object}
    		 */
    		addInterceptor: function(callback, context) {
    		    interceptors.push({
    	            callback: callback,
    	            context: context
    		    });
    		},
    
    		/**
    		 * Add a new listener.
    		 * 
    		 * @method
    		 * @param channel {string}
    		 * @param action {string}
    		 * @param callback {function}
    		 * @param context {string|boolean|number|object}
    		 * @param onetime {?boolean} Indicate if this is an one time use only listener
    		 */
    		addListener: function(channel, action, callback, context, onetime) {
    			listeners[channel] = listeners[channel] || {};
    			listeners[channel][action] = listeners[channel][action] || [];
    			listeners[channel][action].push(new Listener(callback, context, onetime));
    			Logger.debug('Added listener', {channel: channel, action: action, callback: callback, context: context});
    		},
    
    		addWildCardListener: function(callback, context) {
    		    wildCardListeners.push(new Listener(callback, context, false));
    		},
    		
    		/**
    		 * Remove a listener.
    		 * 
    		 * @method
    		 * @param channel {string}
    		 * @param action {?string}
    		 * @param callback {function}
    		 * @param context {string|boolean|number|object}
    		 */
    		removeListener: function(channel, action, callback, context) {
    			if(listeners[channel] && listeners[channel][action]) {
    				var iListeners = listeners[channel][action];
    				for(var x=0; x<iListeners.length; x++) {
    					if(iListeners[x].compare(callback, context)) {
    						iListeners.splice(x, 1);
    					}
    				}
    			}
    			Logger.debug('Removed listener', {channel: channel, action: action, callback: callback, context: context});
    		},
    
    		/**
    		 * Remove listeners.
    		 * 
    		 * @method
    		 * @param channel {string}
    		 * @param action {?string}
    		 */
    		removeListeners: function(channel, action) {
    			if(action) {
    				if(listeners[channel] && listeners[channel][action]) {
    					listeners[channel][action] = null;
    				}
    			}
    			else {
    				listeners[channel] = {};
    			}
    			Logger.debug('Removed listener', {channel: channel, action: action});
    		},
    		
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
    		isListener: function(channel, action, callback, context) {
    			if(listeners[channel] && listeners[channel][action]) {
    				var iListeners = listeners[channel][action];
    				for(var index in iListeners) {
    					if(iListeners[index].compare(callback, context)) {
    						return true;
    					}
    				}
    			}
    			return false;
    		},
    		
    		/**
    		 * Reset, remove all listeners and interceptors.
    		 * 
    		 * @method
    		 */
    		reset: function() {
    			listeners = {};
    			interceptors = [];
    		}
	    };
	
	}) ();
	
	return EventBus;
	
});