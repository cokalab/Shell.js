/**
 * Logger
 * Provides internal component to log info, debug, warning, and error messages
 * 
 * @module Util/Logger
 */
Shell.include('Util/Logger', null, function() {

	// Logging enable status
	var enable = true;
	
    // Stub console for older browser
    if(typeof console === "undefined") {
        console = {};
        var methods = ['log', 'info', 'debug', 'warn', 'error'];
        for(var x=0; x<methods.length; x++) {
            console[methods[x]] = function() {};
        }
    }

    /**
     * Log different types of message generically
     * 
     * @private
     * @method
     * @param action {string} info, debug, warn, and message
     * @param args {arguments} Method arguments
     */
    var log = function(action, args) {
    	if(enable) {
    		console[action].apply(console, args);
    	}
    }
    
    // Public interfaces
    return {

    	/**
    	 * Enable logging
    	 * 
    	 * @public
    	 * @static
    	 * @method
    	 */
    	enable: function() {
    		enable = true;
    	},

    	/**
    	 * Disable logging
    	 * 
    	 * @public
    	 * @static
    	 * @method
    	 */
    	disable: function() {
    		enable = false;
    	},
    	
    	/**
    	 * Log an info message.
    	 * It takes a list of JS objects to output.
    	 * 
    	 * @public
    	 * @static
    	 * @method
    	 */
        info: function() {
            log('info', arguments);
        },

    	/**
    	 * Log a debug message.
    	 * It takes a list of JS objects to output.
    	 * 
    	 * @public
    	 * @static
    	 * @method
    	 */
        debug: function() {
            log('debug', arguments);
        },

    	/**
    	 * Log a warning message.
    	 * It takes a list of JS objects to output.
    	 * 
    	 * @public
    	 * @static
    	 * @method
    	 */
        warn: function() {
            log('warn', arguments);
        },

    	/**
    	 * Log an error message.
    	 * It takes a list of JS objects to output.
    	 * 
    	 * @public
    	 * @static
    	 * @method
    	 */
        error: function() {
            log('error', arguments);
        }
        
    }
    
});