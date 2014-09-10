Shell.include('Test/Component/Loader', ['Component/Loader', 'Util/Logger'], function(Loader, Logger) {

    describe('Component/Loader', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });
        
        it('Define constructor', function () {
            var constructor = function() {};
            Loader.setConstructor('class', constructor);
            expect(Loader.getConstructor('class')).toEqual(constructor);
        });
        
        it('Load component', function () {
            var constructor = {};
            constructor.callback = function() {};
            spyOn(constructor, 'callback');
            Loader.setConstructor('class', constructor.callback);
            var component = Loader.load('id1', 'class');
            expect(component instanceof constructor.callback).toEqual(true);
        });

        it('Remove component', function () {
            var constructor = {};
            constructor.callback = function() {};
            spyOn(constructor, 'callback');
            Loader.setConstructor('class', constructor.callback);
            var component = Loader.load('id2', 'class');
            expect(component instanceof constructor.callback).toEqual(true);
            Loader.destroy('id2');
            expect(Loader.exist('id2')).toEqual(false);
        });

        it('Lookup', function () {
            var constructor = {};
            constructor.callback = function() {};
            Loader.setConstructor('class', constructor.callback);
            var component = Loader.load('id2', 'class');
            expect(Loader.lookup(component)).toEqual('id2');
        });

    });
    
});