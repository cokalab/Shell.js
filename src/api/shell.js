/**
 * Maintain one or multiple component internally and provide interfaces including trigger, on, off, and destroy to interact with components.
 * 
 * @module Api/Shell
 * @requires module:Event/EventBus
 * @requires module:Component/Loader
 * @requires module:Util/ErrorHandler
 */
Shell.include('Api/Shell', ['Event/EventBus', 'Component/Loader', 'Util/ErrorHandler'], function(EventBus, Loader, ErrorHandler) {
	
	/**
	 * @class
	 * @param id {string|string[]} ID of one or multiple components
	 * @alias module:Api/Shell
	 */
	var Shell = function(id) {
		
		// Transform id into an array if it is provided as a string value.
		if(typeof id == 'string') {
			id = [id];
		}
		
		// Event queue. 
		var queue = [];
		
		/**
		 * Return the IDs of the components registered to this Shell object.
		 * 
		 * @method
		 * @return Component IDs {string[]}
		 */
		this.getComponents = function() {
			return id;
		};
		
		/**
		 * Trigger an event on behalf of all components registered to this Shell object.
		 * 
		 * @method
		 * @param action {string} Event action name
		 * @param payload {?(string|number|boolean|object)} Passed to all the listeners
		 */
		this.trigger = function(action, payload) {
			
			ErrorHandler.execute(function(EventBus, id, action, payload) {
				if(typeof action != 'string' || !action) {
					throw 'Invalid action';
				}
				for(var x=0; x<id.length; x++) {
					EventBus.trigger(id[x], action, payload);
				}
			}, [EventBus, id, action, payload], this, 'Encountered error in "Api/Shell.trigger"')
			
		};
		
		/**
		 * Listen to an event on behalf of all components registered to this Shell object.
		 * 
		 * @method
		 * @param action {string} Event action name
		 * @param callback {function} Callback function
		 * @param context {?(string|number|boolean|object)} Becomes "this" when callback is executed. If no context is provided, component instance itself becomes the context.
		 */
		this.on = function(action, callback, context) {
			ErrorHandler.execute(function(EventBus, Loader, id, action, callback, context) {
				if(typeof action != 'string' || !action) {
					throw 'Invalid action';
				}
				if(typeof callback != 'function') {
					throw 'Invalid callback';
				}
				if(typeof context == 'function') {
					throw 'Invalid context';
				}
				for(var x=0; x<id.length; x++) {
					EventBus.addListener(id[x], action, callback, context || Loader.load(id) );
				}
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Api/Shell.on"')
			
		};

		/**
		 * Stop listening to an event on behalf of all components registered to this Shell object.
		 * Action, callback, and context are optional to remove more specific listeners.
		 * 
		 * @method
		 * @param action {string} Event action name
		 * @param callback {?function} Callback function
		 * @param context {?(string|number|boolean|object)} Becomes "this" when callback is executed. If no context is provided, component instance itself becomes the context.
		 */
		this.off = function(action, callback, context) {

			ErrorHandler.execute(function(EventBus, Loader, id, action, callback, context) {
				if(typeof action != 'string' || !action) {
					throw 'Invalid action';
				}
				if(typeof callback != 'function' && callback) {
					throw 'Invalid callback';
				}
				if(typeof context == 'function' && context) {
					throw 'Invalid context';
				}
				for(var x=0; x<id.length; x++) {
					EventBus.removeListener(id[x], action, callback, context);
				}
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Api/Shell.off"')
			
		};
		
		/**
		 * Destroy all components registered to this Shell object
		 * 
		 * @method
		 */
		this.destroy = function() {

			ErrorHandler.execute(function(EventBus, Loader, id) {
				for(var x=0; x<id.length; x++) {
					Loader.destroy(id[x]);
					EventBus.removeListener(id[x]);
				}
			}, [EventBus, Loader, id], this, 'Encountered error in "Api/Shell.destroy"')
			
		};
	}
	
	return Shell;
	
});