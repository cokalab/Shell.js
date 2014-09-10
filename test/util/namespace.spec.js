Sheru.include('Test/Util/Namespace', ['Util/Namespace'], function(Namespace) {

    describe('Util/Namespace.exportMethod', function () {
        
        noop = function() {};
        
        it('One level namespace', function () {
            Namespace.exportMethod('level1', noop);
            expect(Sheru.level1).toEqual(noop);
        });
        
        it('Two level namespace', function () {
            Namespace.exportMethod('levelA.levelB', noop);
            expect(Sheru.levelA.levelB).toEqual(noop);
        });

        it('Undefined namespace', function () {
            Namespace.exportMethod('levelOne', noop);
            expect(Sheru.levelOne.levelTwo).not.toBeDefined(); 
        });

        it('Invalid namespace', function () {
            expect(function() {
                Namespace.exportMethod(123, noop);
            }).toThrow(); 
        });

        it('Invalid method', function () {
            expect(function() {
                Namespace.exportMethod('Level01', null);
            }).toThrow(); 
        });
        
    });
    
});