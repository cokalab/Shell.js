/**
 * Logger
 * Provides internal component to log info, debug, warning, and error messages
 * 
 * @module Util/Logger
 */
Shell.include('Util/Logger', ['Util/Namespace'], function(Namespace) {

	var Logger = (function() {
		
		// Logging enable status
		var enable = true;
	
		// Logging level
		var level = 'warn';
		
	    // Stub console for older browser
	    if(typeof console === "undefined") {
	        console = {};
	        var methods = ['log', 'info', 'debug', 'warn', 'error'];
	        var noop = function() {};
	        for(var x=0; x<methods.length; x++) {
	            console[methods[x]] = noop;
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
	    };
	    
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
	    	 * Set logging level.
	    	 * 
	    	 * @public
	    	 * @static
	    	 * @method
	    	 * @param loggingLeve {string } "info", "debug", "warn", or "error"
	    	 */
	    	setLevel: function(loggingLevel) {
	    		level = loggingLevel;
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
	        	if(level === 'info' || level === 'debug') {
	        		log('info', arguments);
	        	}
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
	        	if(level === 'debug') {
	        		log('debug', arguments);
	        	}
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
	        	if(level === 'info' || level === 'debug' || level === 'warn') {
	        		log('warn', arguments);
	        	}
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
	        
	    };
	    
	}) ();
	
	/**
	 * Set logging level
	 * 
	 * @memberOf Shell.debug
	 * @method setLoggingLevel
	 * @param level {string} "info", "debug", "warn", or "error"
	 */
	Namespace.exportMethod('debug.setLoggingLevel', function(level) {
		if(level !== 'info' && level !== 'debug' && level !== 'warn' && level !== 'error') {
			throw 'Invalid logging levels.';
		}
		Logger.setLevel(level);
	});

	return Logger;
	    
});