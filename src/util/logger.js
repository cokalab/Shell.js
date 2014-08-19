Shell.include('Util.Logger', null, function() {
    
    // Stub console for older browser
    if(typeof console === "undefined") {
        console = {};
        var methods = ['log', 'info', 'debug', 'warn', 'error'];
        for(var x=0; x<methods.length; x++) {
            console[methods[x]] = function() {};
        }
    }

    // Generic log function
    var log = function(action, args) {
        console[action].apply(console, args);
    }
    
    // Public interfaces
    return {
        
        info: function() {
            log('info', arguments);
        },

        debug: function() {
            log('debug', arguments);
        },

        warn: function() {
            log('warn', arguments);
        },

        error: function() {
            log('error', arguments);
        }
        
    }
    
});