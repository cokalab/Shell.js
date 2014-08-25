Shell.include('Api/Component', ['Component/Definition', 'Component/Loader', 'Util/Namespace', 'Util/ErrorHandler', 'Util/Logger'], function(DefinitionMgr, Loader, Namespace, ErrorHandler, Logger) {

	var counter = 0;
	
	/**
	 * Private method to generate unique component ID
	 * @return id {string}
	 */
	var generateUniqueId = function() {
		counter ++;
		return 'Shell-' + counter;
	};
	
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
			DefinitionMgr.set(clazz, definition);
			Loader.setConstructor(clazz, constructor);
		}, [clazz, definition, constructor],
		{
			DefinitionMgr: DefinitionMgr,
			Loader: Loader
		}, 'Encountered error in Shell.define.');

	});

	/**
	 * Create a new component (debug)
	 * 
	 * @memberOf Shell
	 * @method create
	 * @param clazz {string} Component class name
	 */
	Namespace.exportMethod('create', function(clazz) {
		return ErrorHandler.execute(function(Loader, DefinitionMgr, clazz) {
			if(typeof clazz != 'string' || !clazz) {
				throw 'Invalid class name.';
			}
			var id;
			if(DefinitionMgr.get(clazz).singleton) {
				id = clazz;
			}
			else {
				id = generateUniqueId();
			}
			Loader.load(id, clazz);
		}, [Loader, DefinitionMgr, clazz], this, 'Encountered error in Shell.debug.getDefinition.');

	});

	/**
	 * Get component definition (debug)
	 * 
	 * @memberOf Shell.debug
	 * @method getDefinition
	 * @param clazz {string} Component class name
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
		}, 'Encountered error in Shell.debug.getDefinition.');

	});

	/**
	 * Get component constructor (debug)
	 * 
	 * @memberOf Shell.debug
	 * @method getDefinition
	 * @param clazz {string} Component class name
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
		}, 'Encountered error in Shell.debug.getDefinition.');

	});
	
});