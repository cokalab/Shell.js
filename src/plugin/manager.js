/**
 * @namespace Shell.plugin
 * @memberof Shell
 */
/**
 * Register plug-in implementation that effects all Shell components.
 * @module Component/Api
 * @requires module:Event/EventBus
 * @requires module:Util/Namespace
 * @requires module:Util/Validator
 * @requires module:Util/Logger
 */
Shell.include('Plugin/Manager', ['Event/EventBus', 'Util/Namespace', 'Util/Validator', 'Util/Logger'], function(EventBus, Namespace, Validator, Logger) {
    "use strict";

    /**
     * Register a plugin
     * 
     * @memberOf Shell.plugin
     * @method register
     * @param name {string}
     * @param callbacks {Object.<string, function>} Action is the key, callback is the value
     * @param context {null | string | number | boolean | object | array}
     */
    Namespace.exportMethod('plugin.register', function(name, callbacks, context) {
        ErrorHandler.execute(function(name, callbacks, context) {
            if(!Validator.validate('string', name)) {
                throw 'Invalid plug-in name';
            }
            if(typeof callbacks != 'object') {
                throw 'Invalid plug-in callback mapping';
            }
            if(typeof context == 'function') {
                throw 'Invalid plug-in callback context';
            }
            var action;
            for(action in callbacks) {
                if(typeof callbacks == 'function') {
                    EventBus.addInterceptor('*', action, callbacks[action], context || window);
                    Logger.debug(name + 'plug-in: Registered callback for event "' + action + '".');
                }
            }
            Logger.debug(name + 'plug-in registered');
            return Shell;
        }, [name, callbacks, context],
        {
            EventBus:EventBus,
            Validator: Validator
        }, 'Encountered error in "Shell.define".');

    });
});             