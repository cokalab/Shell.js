/**
 * Contains component life cycle public interfaces.
 *
 * @module Component/Api
 * @requires module:Component/Id
 * @requires module:Component/Definition
 * @requires module:Component/Loader
 * @requires module:Component/Lookup
 * @requires module:Component/Interface
 * @requires module:Util/Namespace
 * @requires module:Util/ErrorHandler
 * @requires module:Util/Logger
 * @requires module:Util/Validator
 */
Shell.include('Component/Api', ['Event/EventBus', 'Component/Id', 'Component/Definition', 'Component/Loader', 'Component/Lookup', 'Component/Interface', 'Util/Namespace', 'Util/ErrorHandler', 'Util/Logger', 'Util/Validator'], function(EventBus, IdGenerator, DefinitionMgr, Loader, Lookup, Interface,  Namespace, ErrorHandler, Logger, Validator) {
	"use strict";

	// Interface queue
	// New interface is pushed to the queue when a component is instantiated and poped after component is created.
	// This way "Shell" prototype is always set to the latest interface.
	var ComponentInterfaceQueue = [];

	/**
	 * Define a component
	 *
	 * @memberOf Shell
	 * @method define
	 * @param clazz {string} Component class name
	 * @param definition {object} Component definition
	 * @param constructor {function} Constructor function
	 */
	Namespace.exportMethod('define', function(clazz, definition, constructor) {
		return ErrorHandler.execute(function(clazz, definition, constructor) {
		    if(!Validator.validate('string', clazz)) {
		        throw 'Invalid component class name.';
		    }
		    if(!Validator.validate('object', definition)) {
                throw 'Invalid component definition.';
            }
			if(typeof constructor != 'function') {
				throw 'Invalid constructor function.';
			}
			constructor.prototype.Shell = function() {
				return ComponentInterfaceQueue[ComponentInterfaceQueue.length - 1];
			};
			DefinitionMgr.set(clazz, definition);
			Loader.setConstructor(clazz, constructor);
			return Shell;
		}, [clazz, definition, constructor],
		{
			DefinitionMgr: DefinitionMgr,
			Loader: Loader
		}, 'Encountered error in "Shell.define".');

	});

	/**
	 * Create a new component
	 *
	 * @memberOf Shell
	 * @method create
	 * @param clazz {string} Component class name
	 */
	Namespace.exportMethod('create', function(clazz) {
		return ErrorHandler.execute(function(clazz) {
			if(typeof clazz != 'string' || !clazz) {
				throw 'Invalid class name.';
			}
			var id;
			if(this.DefinitionMgr.get(clazz).singleton) {
				id = clazz;
			}
			else {
				id = IdGenerator.generate();
			}
			// Create an interface and push it to the queue
			ComponentInterfaceQueue.push(new Interface(id, true));
			// Load object
			var component = this.Loader.load(id, clazz, new Interface(id).initialize());
			// Register lookup data
			Lookup.register(id, clazz);
			// Overwrite prototype
			component.Shell = Shell.version;
			// Pop the last interface from the queue after it's done and load the one before.
			ComponentInterfaceQueue[ComponentInterfaceQueue.length-1].initialize();
			ComponentInterfaceQueue.pop();
			// Trigger initialize
			EventBus.trigger(id, 'Initialize');
			return new Interface(id).initialize();
		}, [clazz], {
			DefinitionMgr: DefinitionMgr,
			Loader: Loader,
			EventBus: EventBus
		}, 'Encountered error in "Shell.create".');

	});

	/**
	 * Find components
	 *
	 * @memberOf Shell
	 * @method create
	 * @param selector {string} Component id, class name, or context
	 */
	Namespace.exportMethod('find', function(selector) {
		return ErrorHandler.execute(function(Loader, DefinitionMgr, selector) {
			if( (typeof selector != 'string' && typeof selector != 'object') || !selector) {
				throw 'Invalid selector.';
			}
			var ids, shell;
			if (typeof selector == 'string') {
				ids = Lookup.lookup(selector);
				shell = new Interface(ids, false).initialize();
				return shell;
			}
			else if(typeof selector == 'object') {
				if(typeof selector.Shell == 'function') {
					return selector.Shell();
				}
				else {
					ids = Loader.lookup(selector);
					shell = new Interface(ids, true).initialize();
					return shell;
				}
			}
			return new Interface([]);
		}, [Loader, DefinitionMgr, selector], this, 'Encountered error in "Shell.create".');

	});

	/**
	 * Destroy all components
	 *
	 * @memberOf Shell
	 * @method destroy
	 */
	Namespace.exportMethod('destroy', function() {
		return ErrorHandler.execute(function(Loader, DefinitionMgr, Lookup) {
			var ids = Lookup.getAll();
			for(var x=0; x<ids.length; x++) {
				var id = ids[x];
				new Interface(id).initialize().destroy();

			}
			return Shell;
		},
		[Loader, DefinitionMgr, Lookup], this,
		'Encountered error in "Shell.create".');

	});

	/**
	 * Get component definition (debug)
	 *
	 * @memberOf Shell.debug
	 * @method getDefinition
	 * @param clazz {string} Component class name
	 * @return definition {object}
	 */
	Namespace.exportMethod('debug.getDefinition', function(clazz) {
		return ErrorHandler.execute(function(clazz) {
			if(typeof clazz != 'string' || !clazz) {
				throw 'Invalid class name.';
			}
			return DefinitionMgr.get(clazz);
		}, [clazz],
		{
			DefinitionMgr: DefinitionMgr
		}, 'Encountered error in "Shell.debug.getDefinition".');

	});

	/**
	 * Get component constructor (debug)
	 *
	 * @memberOf Shell.debug
	 * @method getConstructor
	 * @param clazz {string} Component class name
	 * @return constructor {object}
	 */
	Namespace.exportMethod('debug.getConstructor', function(clazz) {
		return ErrorHandler.execute(function(clazz) {
			if(typeof clazz != 'string' || !clazz) {
				throw 'Invalid class name.';
			}
			return Loader.getConstructor(clazz);
		}, [clazz],
		{
			Loader: Loader
		}, 'Encountered error in "Shell.debug.getConstructor".');

	});

});