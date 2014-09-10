Sheru.include('Test/Component/Id', ['Component/Id', 'Util/Logger'], function(IdGenerator, Logger) {

    describe('Component/Id', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });
        
        it('Generate ID', function () {
        	expect(typeof IdGenerator.generate()).toEqual('string');
            expect(IdGenerator.generate()).not.toEqual(IdGenerator.generate());
        });
        
    });
    
});