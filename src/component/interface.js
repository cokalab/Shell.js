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
 * @requires module:Util/Validator
 */
Shell.include('Component/Interface', ['Event/EventBus', 'Component/Loader', 'Component/Definition', 'Component/Lookup', 'Util/ErrorHandler', 'Util/Logger', 'Util/Validator'], function(EventBus, Loader, DefinitionMgr, Lookup, ErrorHandler, Logger, Validator) {
    "use strict";

	/**
	 * @class
	 * @param id {string|string[]} ID of one or multiple components
	 * @param self {?boolean} True if the interface is requested by the component itself. False / Null if requested by other components.
	 * @alias module:Component/Interface
	 */
	var Interface = function(id, self) {

		// Transform id into an array if it is provided as a string value.
		if(typeof id == 'string') {
			id = [id];
		}

		// Event queue.
		var queue = [];

		// Task to be executed after component is instantiated.
		var taskQueue = [];

		var ready = false;

		var defaultContext = null;

		/**
		 * Return true if the interface is ready to be used. False otherwise.
		 *
		 * @return {boolean}
		 */
		var isReady = function() {
			return ready;
		};

		/**
		 * Push task to task queue
		 *
		 * @method
		 * @private
		 * @param method {function}
		 */
		var pushTask = function(method, args, context) {
			taskQueue.push({
				method: method,
				args: args,
				context: context,
			});
		};

		/**
		 * Make the component ready and start executing tasks inside task queue.
		 * "ready" method is removed afterward.
		 *
		 * @method
		 * @return {module:Component/Interface}
		 */
		this.initialize = function() {
			ready = true;
			delete this.initialize;
			for(var x=0; x<taskQueue.length; x++) {
				var task = taskQueue[x];
				task.method.apply(task.context, task.args);
			}
			return this;
		};

		/**
		 * Set the default context binded to this interface.
		 * Context becomes "this" variables in all the listener callback.
		 *
		 * @method
		 * @param context {}
		 */
		this.setContext = function(context) {
			defaultContext = context;
		};

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
			if(!isReady()) {
				pushTask(this.trigger, [action, payload], this);
				return;
			}
			return ErrorHandler.execute(function(EventBus, id, action, payload) {
				if(!Validator.validate('string', action)) {
				    throw 'Invalid event action.';
				}
				for(var x=0; x<id.length; x++) {
					var clazz = Lookup.lookupClass(id[x]);
					if(DefinitionMgr.get(clazz).strict !== false) {
						if(!self) {
							var inputs = DefinitionMgr.get(clazz).inputs;
							if(inputs && typeof inputs[action] != 'undefined') {
								if(inputs[action] !== null && payload !== null) {
					                if(!Validator.validate(inputs[action], payload)) {
					                    throw 'Invalid payload for input ' + action + ' in ' + clazz + '.';
					                }
								}
								if(inputs[action] === null || inputs[action] === 'null') {
									if(typeof payload != 'undefined' && payload !== null) {
										throw 'Invalid payload for input ' + action + ' in ' + clazz + '.';
									}
								}
							}
						}
						else {
							var outputs = DefinitionMgr.get(clazz).outputs;
							if(outputs && typeof outputs[action] != 'undefined') {
								if(outputs[action] !== null && payload !== null) {
								    if(!Validator.validate(outputs[action], payload)) {
								        throw 'Invalid payload for output ' + action + ' in ' + clazz + '.';
								    }
								}
								if(outputs[action] === null || outputs[action] === 'null') {
									if(typeof payload != 'undefined' && payload !== null) {
										throw 'Invalid payload for output ' + action + ' in ' + clazz + '.';
									}
								}
							}
							else {
								throw 'Undefined output ' + action + ' in ' + clazz + '.';
							}
						}
					}
					EventBus.trigger(id[x], action, payload);
				}
				return this;
			}, [EventBus, id, action, payload], this, 'Encountered error in "Component/Interface.trigger".');

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
			if(!isReady()) {
				pushTask(this.on, [action, callback, context], this);
				return;
			}
			context = context || defaultContext;
			return ErrorHandler.execute(function(EventBus, Loader, id, action, callback, context) {
				if(typeof action != 'string' || !action) {
					throw 'Invalid action';
				}
				if(typeof callback != 'function') {
					throw 'Invalid callback';
				}
				if(typeof context == 'function' || typeof context == 'undefined' || context === null) {
					throw 'Invalid context';
				}
				for(var x=0; x<id.length; x++) {
					EventBus.addListener(id[x], action, callback, context );
				}
				return this;
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Component/Interface.on".');
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
			if(!isReady()) {
				pushTask(this.once, [action, callback, context], this);
				return;
			}
			context = context || defaultContext;
			return ErrorHandler.execute(function(EventBus, Loader, id, action, callback, context) {
				if(typeof action != 'string' || !action) {
					throw 'Invalid action';
				}
				if(typeof callback != 'function') {
					throw 'Invalid callback';
				}
				if(typeof context == 'function' || typeof context == 'undefined' || context === null) {
					throw 'Invalid context';
				}
				for(var x=0; x<id.length; x++) {
					EventBus.addListener(id[x], action, callback, context, true);
				}
				return this;
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Component/Interface.on".');

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
			if(!isReady()) {
				pushTask(this.off, [action, callback, context], this);
				return;
			}
			return ErrorHandler.execute(function(EventBus, Loader, id, action, callback, context) {
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
					EventBus.removeListener(id[x], action, callback, context || this);
				}
				return this;
			}, [EventBus, Loader, id, action, callback, context], this, 'Encountered error in "Component/Interface.off".');

		};

        /**
         * Empty method used by destroy event.
         *
         * @method
         */
		this.noop = function() {

		};

		/**
		 * Destroy all components registered to this Interface object
		 *
		 * @method
		 */
		this.destroy = function() {
			if(!isReady()) {
				pushTask(this.destroy, ['Destroy', this.noop, this], this);
				return;
			}
			ErrorHandler.execute(function(EventBus, Loader, DefinitionMgr, Lookup, id) {
				for(var x=0; x<id.length; x++) {
					var clazz = Lookup.lookupClass(id[x]);
					if(DefinitionMgr.get(clazz).indestructible) {
						continue;
					}
					EventBus.trigger(id[x], 'Destroy');
					Loader.destroy(id[x]);
					Lookup.remove(id[x]);
					EventBus.removeListener(id[x]);
				}
			}, [EventBus, Loader, DefinitionMgr, Lookup, id], this, 'Encountered error in "Component/Interface.destroy".');

		};
	};

	return Interface;

});