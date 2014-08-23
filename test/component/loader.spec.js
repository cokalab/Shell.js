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
            Loader.define('class', constructor);
            expect(Loader.getConstructor('class')).toEqual(constructor);
        });
        
        it('Load component', function () {
            var constructor = {};
            constructor.callback = function() {};
            spyOn(constructor, 'callback');
            Loader.define('class', constructor.callback);
            var component = Loader.load('id', 'class');
            expect(constructor.callback).toHaveBeenCalled();
            expect(component).not.toBe(null);
        });

        it('Remove component', function () {
            var constructor = {};
            constructor.callback = function() {};
            spyOn(constructor, 'callback');
            Loader.define('class', constructor.callback);
            var component = Loader.load('id', 'class');
            expect(constructor.callback).toHaveBeenCalled();
            expect(component).not.toBe(null);
        });

    });
    
});