/**
 * Wrap any method inside a try catch statement to prevent complete page break down when some JS goes wrong. 
 * If error handler is disabled, JS exceptions will not be caught.
 * 
 * @module Util/ErrorHandler
 * @requires module:Util/Namespace
 * @requires module:Util/Logger
 */
Shell.include('Util/ErrorHandler', ['Util/Namespace', 'Util/Logger'], function(Namespace, Logger) {
	
	/**
	 * Error handler implementation (Singleton).
	 */
	var ErrorHandler = new function() {

		var enable = false;
			
		/**
		 * Enable error handling
		 * 
		 * @method
		 * @static
		 */
		this.enable = function() {
			enable = true;
		};

		/**
		 * Disable error handling
		 * 
		 * @method
		 * @static
		 */
		this.disable = function() {
			enable = false;
		};

		/**
		 * Execute a method with context and arguments provided. 
		 * If error handling is enabled, log error messages when something goes wrong.
		 * Otherwise we will let the exception fly.
		 * 
		 * @method
		 * @static
		 * @param callback {function} Method to be executed
		 * @param args {?object[]} Arguments passed to the callback method
		 * @param contest {?object} Callback method's context
		 * @param errorMsg {?string} Optional error message to be displayed when something goes wrong while error handling is on.
		 */
		this.execute = function(callback, args, context, errorMsg) {
			if(enable) {
				try {
					return callback.apply(context, args);
				}
				catch(e) {
					Logger.error(errorMsg || 'Enounctered error', e);
				}
			}
			else {
				return callback.apply(context, args);
			}
		};
		
	};
	
	/**
	 * Enable error handling.
	 * All errors are caught internally and logged.
	 * 
	 * @memberOf Shell
	 * @method enableErrorHandler
	 */
	Namespace.exportMethod('debug.enableErrorHandler', function() {
		ErrorHandler.enable();
	});
	
	return ErrorHandler;
	
});