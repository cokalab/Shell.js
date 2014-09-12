/**
 * Component loader instantiates, destroies, and manages components, actual JS objects hidden from the public.
 * 
 * @module Component/Loader
 * @requires module:Util/Registry
 * @requires module:Util/Logger
 */
Shell.include('Component/Loader', ['Util/Registry', 'Util/Logger'], function(Registry, Logger) {
    'use strict';
    
    var Loader = new function() {

        // Store constructors
        var ConstructorRegistry = new Registry('ComponentConstructor');
        
        // Store component instances
        var ComponentRegistry = new Registry('ComponentInstance');
        
        /**
         * Set component constructor
         * 
         * @method 
         * @param clazz {string} Component class name
         * @param constructor {function} Component constructor function.
         */
        this.setConstructor = function(clazz, constructor) {
            ConstructorRegistry.set(clazz, constructor);
            Logger.debug('Defined constructor', {clazz: clazz, constructor: constructor});
        };

        /**
         * Get component constructor
         * 
         * @method 
         * @param clazz {string} Component class name
         * @return constructor {function}
         */
        this.getConstructor = function(clazz) {
            return ConstructorRegistry.get(clazz);
        };
        
        /**
         * Load a component. 
         * If the component does not exist for the given ID, create a new one.
         * 
         * @method 
         * @param id {string] Component unique ID
         * @param clazz {string} Component class name, used to instantiate a component.
         */
        this.load = function(id, clazz) {
            // Return component if it is already instantiated.
            if(ComponentRegistry.exist(id)) {
                Logger.debug('Loaded component from registry', {id: id});
                return ComponentRegistry.get(id);
            }
            // Construct a new component.
            if(!ConstructorRegistry.exist(clazz)) {
                throw 'Constructor is not defined yet for ' + clazz;
            }
            var constructor = ConstructorRegistry.get(clazz);
            var component = new constructor();
            Logger.debug('Instantiated component', {id: id, clazz: clazz});
            ComponentRegistry.set(id, component);
            return component;
        };

        
        /**
         * Look up a component's ID if component provided is already loaded
         * 
         *  @method
         *  @param component {object}
         *  @return id {string}
         */
        this.lookup = function(component) {
        	return ComponentRegistry.getKey(component);
        };
        
        /**
         * Determine if a component exists in memory
         * 
         * @method
         * @param id {string}
         * @return {boolean}
         */
        this.exist = function(id) {
        	return ComponentRegistry.exist(id);
        };
        
        /**
         * Destroy a component
         * 
         *  @method
         *  @param id {string} Component unique ID
         */
        this.destroy = function(id) {
            ComponentRegistry.remove(id);
            Logger.debug('Removed component', {id: id});
        };
        
    }();
    
    return Loader;
});