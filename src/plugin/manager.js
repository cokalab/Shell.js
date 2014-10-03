/**
 * @namespace Shell.plugin
 * @memberof Shell
 */
/**
 * Register plug-in implementation that effects all Shell components.
 * @module Component/Api
 * @requires module:Component/Definition
 * @requires module:Component/Lookup
 * @requires module:Component/Loader
 * @requires module:Event/EventBus
 * @requires module:Util/Namespace
 * @requires module:Util/Validator
 * @requires module:Util/Logger
 */
Shell.include('Plugin/Manager', ['Component/Definition', 'Component/Lookup', 'Component/Loader', 'Event/EventBus', 'Event/Event', 'Util/Namespace', 'Util/Validator', 'Util/ErrorHandler', 'Util/Registry', 'Util/Logger'], function(Definition, Lookup, Loader, EventBus, Event, Namespace, Validator, ErrorHandler, Registry, Logger) {
    "use strict";

    var pluginRegistry = new Registry();
    
    /**
     * Register a plugin
     * 
     * @memberOf Shell.plugin
     * @method register
     * @param action {string}
     * @param structure {object} Used for data structure validation. Same as component's inputs field.
     * @param callback {function}
     * @param context {?(string|number|boolean|object)} Becomes "this" when callback is executed. If no context is provided, component instance itself becomes the context.
     */
    Namespace.exportMethod('plugin.register', function(name, action, structure, callback, context) {
        ErrorHandler.execute(function(action, structure, callback, context) {
            if(!Validator.validate('string', action)) {
                throw 'Invalid event action.';
            }
            if(!Validator.validate('string', structure) && !Validator.validate('object', structure)) {
                throw 'Invalid callback function.';
            }
            if(typeof callback != 'function') {
                throw 'Invalid callback function.';
            }
            if(typeof context == 'function') {
                throw 'Invalid context';
            }
            EventBus.addInterceptor((function(action, structure, callback, context) {
                return function(event) {
                    var response = {
                        overwrite: false,
                        event: {}
                    }
                    if(action !== event.getAction()) {
                        return response
                    }
                    var payload = event.getPayload();
                    var id = event.getChannel();
                    var clazz = Lookup.lookupClass(id);
                    var definition = Definition.get(clazz);
                    if(definition && definition.inputs && typeof definition.inputs[action] != 'undefined') {
                        return response;
                    }
                    else {
                        if(!Validator.validate(structure, payload)) {
                            throw 'Invalid payload for input ' + action + ' in "' + name + '" plug-in.';
                        }
                        payload = callback.call(context, payload, {id: id, clazz: clazz});
                    }
                    response.overwrite = true;
                    response.payload = payload; 
                    return response;
                }
            })(action, structure, callback, context), this);
            Logger.debug(name + 'plug-in registered');
            return Shell;
        }, [action, structure, callback, context, name],
        {
            Definition: Definition,
            Lookup: Lookup,
            Loader: Loader,
            EventBus:EventBus,
            Validator: Validator
        }, 'Encountered error in "Shell.plugin.registr".');

    });
});             