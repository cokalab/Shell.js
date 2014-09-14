Shell.include('Test/Component/Interface', ['Component/Interface', 'Event/EventBus', 'Component/Loader', 'Component/Definition', 'Component/Lookup', 'Util/Logger'], function(Interface, EventBus, Loader, Definition, Lookup, Logger) {

    describe('Component/Interface', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });

        it('Construct', function () {
        	var shell = new Interface('id');
        	expect(shell.getComponents()).toEqual(['id']);
        	var shell = new Interface(['1', '2', '3']);
        	expect(shell.getComponents()).toEqual(['1', '2', '3']);
        });

        it('On, Trigger, and Off', function () {
        	var flag = false;
        	var foo = function() {
        		flag = true;
        	}
        	// Add listener
        	var shell = new Interface('id');
        	shell.on('act', foo, this);
        	// Trigger
        	shell.trigger('act');
        	expect(flag).toEqual(true);
        	// Remove listener
        	flag = false;
        	shell.off('act', foo, this);
        	shell.trigger('act');
        	expect(flag).toEqual(false);
        });

        it('On multiple times and trigger', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var shell = new Interface('id');
        	shell.on('act', foo, this);
        	shell.on('act', foo, this);
        	shell.trigger('act');
        	expect(counter).toEqual(2);
        });

        it('On and off multiple times', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var shell = new Interface('id');
        	shell.on('act', function() {}, this);
        	shell.on('act', function() {}, this);
        	shell.off('act')
        	expect(EventBus.isListener('id', 'act')).toEqual(false);
        });

        it('Once and trigger', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var context = {};
        	var shell = new Interface('id-once');
        	shell.once('act', foo, this);
        	shell.trigger('act');
        	shell.trigger('act');
        	expect(counter).toEqual(1);
        });

        it('Destroy', function() {
        	Lookup.register('id-d', 'class-d');
        	Definition.set('class-d', {
        		'events': {}
        	});
        	var shell = new Interface('id-d');
        	shell.destroy();
        	expect(Loader.exist('id-d')).toEqual(false);
        });
        
    });
    
});