Shell.include('Test/Component/Lookup', ['Component/Lookup', 'Util/Logger'], function(Lookup, Logger) {

    describe('Component/Lookup', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });
        
        it('Lookup', function () {
            Lookup.register('id1', 'class1');
            expect(Lookup.lookup('class1')).toEqual(['id1']);
            expect(Lookup.lookup('id1')).toEqual(['id1']);
        });

        it('Lookup with multiple instances', function () {
            Lookup.register('id2', 'class2');
            Lookup.register('id3', 'class2');
            Lookup.register('id4', 'class2');
            expect(Lookup.lookup('id2')).toEqual(['id2']);
            expect(Lookup.lookup('id3')).toEqual(['id3']);
            expect(Lookup.lookup('id4')).toEqual(['id4']);
            expect(Lookup.lookup('class2')).toEqual(['id2', 'id3', 'id4']);
        });
        
        it('Register same id twice', function () {
            Lookup.register('id5', 'class5');
            expect(function() {
            	Lookup.register('id5', 'class5');
            }).toThrow();
        });

        it('Remove', function () {
            Lookup.register('r1', 'class-r1');
            Lookup.register('r2', 'class-r1');
            Lookup.register('r3', 'class-r2');
            Lookup.remove('r1');
            Lookup.remove('r2');
            Lookup.remove('r3');
            expect(Lookup.lookup('r1')).toEqual([]);
            expect(Lookup.lookup('r2')).toEqual([]);
            expect(Lookup.lookup('r3')).toEqual([]);
            expect(Lookup.lookup('class-r1')).toEqual([]);
            expect(Lookup.lookup('class-r2')).toEqual([]);
        });
        
    });
    
});