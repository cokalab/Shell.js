/**
 * Component interface is basically a wrapper around the object itself providing methods to communicate with other components over the event bus.
 * 
 * @module Component/Interface
 * @requires module:Event/EventBus
 * @requires module:Component/Loader
 * @requires module:Component/Definition
 * @requires module:Component/Lookup
 * @requires module:Util/ErrorHandler
 * @requires module:Util/Logger
 */
Shell.include('Component/Interface', ['Event/EventBus', 'Component/Loader', 'Component/Definition', 'Component/Lookup', 'Util/ErrorHandler', 'Util/Logger'], function(EventBus, Loader, DefinitionMgr, Lookup, ErrorHandler, Logger) {

	Logger.disable();
	DefinitionMgr.addRequiredDefinitionField('events');
	Logger.enable();
	
	/**
	 * @class
	 * @param id {string|string[]} ID of one or multiple components
	 * @alias module:Component/Interface
	 */
	var Interface = function(id) {
		
		// Transform id into an array if it is provided as a string value.
		if(typeof id == 'string') {
			id = [id];
		}
		
		// Event queue. 
		var queue = [];
		
		/**
		 * Return the IDs of the components registered to this Interface object.
		 * 
		 * @method
		 * @return Component IDs {string[]}
		 */
		this.getComponents = function() {
			return id;
		};
		
		/**
		 * Trigger an event on behalf of all components registered to this Interface object.
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
			}, [EventBus, id, action, payload], this, 'Encountered error in "Component/Interface.trigger".')
			
		};
		
		/**
		 * Listen to an event on behalf of all components registered to this Interface object.
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
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Component/Interface.on".')
			
		};
		
		/**
		 * Listen to an event on behalf of all components registered to this Interface object.
		 * The only difference is the listener will be removed after it is executed.
		 * 
		 * @method
		 * @param action {string} Event action name
		 * @param callback {function} Callback function
		 * @param context {?(string|number|boolean|object)} Becomes "this" when callback is executed. If no context is provided, component instance itself becomes the context.
		 */
		this.once = function(action, callback, context) {
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
					EventBus.addListener(id[x], action, callback, context || Loader.load(id), true);
				}
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Component/Interface.on".')
			
		};
		
		/**
		 * Stop listening to an event on behalf of all components registered to this Interface object.
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
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Component/Interface.off".')
			
		};
		
		/**
		 * Destroy all components registered to this Interface object
		 * 
		 * @method
		 */
		this.destroy = function() {
			ErrorHandler.execute(function(EventBus, Loader, DefinitionMgr, Lookup, id) {
				for(var x=0; x<id.length; x++) {
					var clazz = Lookup.lookupClass(id[x]);
					if(DefinitionMgr.get(clazz).indestructible) {
						continue;
					}
					Loader.destroy(id[x]);
					Lookup.remove(id);
					EventBus.removeListener(id[x]);
				}
			}, [EventBus, Loader, DefinitionMgr, Lookup, id], this, 'Encountered error in "Component/Interface.destroy".')
			
		};
	}
	
	return Interface;
	
});