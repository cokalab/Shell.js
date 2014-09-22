Shell.include('Test/Util/Namespace', ['Util/Namespace'], function(Namespace) {
    "use strict";
    
    describe('Util/Namespace.exportMethod', function () {
        
        var noop = function() {};
        
        it('Export method to level one namespace', function () {
            Namespace.exportMethod('noop', noop);
            expect(Shell.noop).toEqual(noop);
        });
        
        it('Export method to level two namespace', function () {
            Namespace.exportMethod('two.noop', noop);
            expect(Shell.two.noop).toEqual(noop);
        });
        
        it('Export multiple methods to level two namespace', function () {
            Namespace.exportMethod('noop1', noop);
            Namespace.exportMethod('noop2', noop);
            expect(Shell.noop1).toEqual(noop);
            expect(Shell.noop2).toEqual(noop);
        });

    });
    
});