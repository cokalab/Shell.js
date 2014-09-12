Shell.include('Component/Api', ['Component/Id', 'Component/Definition', 'Component/Loader', 'Component/Lookup', 'Component/Interface', 'Util/Namespace', 'Util/ErrorHandler', 'Util/Logger'], function(IdGenerator, DefinitionMgr, Loader, Lookup, Interface,  Namespace, ErrorHandler, Logger) {
	"use strict"
	
	// Component interface.
	// This is attached to all constructor's "Shell" prototype so that interface can be accessed while component is in the process of instantiation.
	var ComponentInterface = null;
	
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
		ErrorHandler.execute(function(clazz, definition, constructor) {
			if(typeof clazz != 'string' || !clazz) {
				throw 'Invalid class name.';
			}
			if(typeof definition != 'object') {
				throw 'Invalid definition.';
			}
			if(typeof constructor != 'function') {
				throw 'Invalid constructor function.';
			}
			constructor.prototype.Shell = function() {
				return ComponentInterface;
			};
			DefinitionMgr.set(clazz, definition);
			Loader.setConstructor(clazz, constructor);
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
			ComponentInterface = new Interface(id)
			ComponentInterfaceQueue.push(ComponentInterface);
			// Load object
			var component = this.Loader.load(id, clazz); 
			// Register lookup data
			Lookup.register(id, clazz);
			// Overwrite prototype
			component.Shell = Shell.version;
			// Pop the last interface from the queue after it's done and load the one before.
			ComponentInterfaceQueue.pop();
			if(ComponentInterfaceQueue.length > 0) {
				ComponentInterface = ComponentInterfaceQueue[ComponentInterfaceQueue.length - 1]; 
			}
		}, [clazz], {
			DefinitionMgr: DefinitionMgr,
			Loader: Loader
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
			if (typeof selector == 'string') {
				var ids = Lookup.lookup(selector);
				var shell = new Interface(ids);
				return shell;
			}
			else if(typeof selector == 'object') {
				if(typeof selector.Shell == 'function') {
					return selector.Shell();
				}
				else {
					var ids = Loader.lookup(selector);
					var shell = new Interface(ids);
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
			}
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