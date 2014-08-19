Shell.include('Test.Util.Logger', ['Util.Logger'], function(Logger) {

    describe('Util.Logger', function () {
        
        it('Log info', function () {
            spyOn(console, 'info');
            Logger.info('test');
            expect(console.info).toHaveBeenCalled()
        });

        it('Log debug', function () {
            spyOn(console, 'debug');
            Logger.debug('test');
            expect(console.debug).toHaveBeenCalled()
        });

        it('Log warning', function () {
            spyOn(console, 'warn');
            Logger.warn('test');
            expect(console.warn).toHaveBeenCalled()
        });

        it('Log error', function () {
            spyOn(console, 'error');
            Logger.error('test');
            expect(console.error).toHaveBeenCalled()
        });
        
    });
    
});