Shell.include('Test/Component/Lookup', ['Component/Lookup', 'Util/Logger'], function(Lookup, Logger) {

    describe('Component/Lookup', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });
        
        it('Lookup', function () {
            Lookup.register('s1', 'class-s1');
            expect(Lookup.lookup('class-s1')).toEqual(['s1']);
            expect(Lookup.lookup('s1')).toEqual(['s1']);
        });

        it('Lookup with multiple instances', function () {
            Lookup.register('m1', 'class-m2');
            Lookup.register('m2', 'class-m2');
            Lookup.register('m3', 'class-m2');
            expect(Lookup.lookup('class-m2')).toEqual(['m1', 'm2', 'm3']);
        });
        
        it('Register same id twice', function () {
            Lookup.register('id5', 'class5');
            expect(function() {
            	Lookup.register('id5', 'class5');
            }).toThrow();
        });

        it('Get keys', function () {
            Lookup.register('k1', 'class-k1');
            expect(Lookup.getAll().indexOf('k1') >= 0).toEqual(true);
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