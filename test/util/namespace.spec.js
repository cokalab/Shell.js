Shell.include('Test/Util/Namespace', ['Util/Namespace'], function(Namespace) {

    describe('Util/Namespace.exportMethod', function () {
        
        noop = function() {};
        
        it('One level namespace', function () {
            Namespace.exportMethod('level1', noop);
            expect(Shell.level1).toEqual(noop);
        });
        
        it('Two level namespace', function () {
            Namespace.exportMethod('levelA.levelB', noop);
            expect(Shell.levelA.levelB).toEqual(noop);
        });

        it('Undefined namespace', function () {
            Namespace.exportMethod('levelOne', noop);
            expect(Shell.levelOne.levelTwo).not.toBeDefined(); 
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