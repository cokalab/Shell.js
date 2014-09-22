Shell.include('Test/Util/Logger', ['Util/Logger'], function(Logger) {
    "use strict";
    
    describe('Util.Logger', function () {

    	beforeEach(function() {
    		Logger.setLevel('debug');
    	});

    	afterEach(function() {
    		Logger.enable();
    		Logger.setLevel('error');
    	});
    	
        it('Log info', function () {
            spyOn(console, 'info');
            Logger.info('Log info message');
            expect(console.info).toHaveBeenCalled();
        });

        it('Log debug', function () {
            spyOn(console, 'debug');
            Logger.debug('Log debug message');
            expect(console.debug).toHaveBeenCalled();
        });

        it('Log warning', function () {
            spyOn(console, 'warn');
            Logger.warn('Log warning message');
            expect(console.warn).toHaveBeenCalled();
        });

        it('Log error', function () {
            spyOn(console, 'error');
            Logger.error('Log error message');
            expect(console.error).toHaveBeenCalled();
        });
    	
        it('Enable logger', function () {
            spyOn(console, 'info');
            Logger.enable();
            Logger.info('Log info message');
            expect(console.info).toHaveBeenCalled();
        });

        it('Disable logger', function () {
            spyOn(console, 'info');
            Logger.disable();
            Logger.info('Log info message');
            expect(console.info).not.toHaveBeenCalled();
        });

        it('Set log level (Invoked from module)', function () {
            spyOn(console, 'info');
            Logger.setLevel('error');
            Logger.info('Log info message');
            expect(console.info).not.toHaveBeenCalled();
        });

        it('Set log level (Invoked from global debugger)', function () {
            spyOn(console, 'info');
            Shell.debug.setLoggingLevel('error');
            Logger.info('Log info message');
            expect(console.info).not.toHaveBeenCalled();
        });
        
    });
    
});