Shell.include('Test/Component/Interface', ['Component/Interface', 'Event/EventBus', 'Component/Loader', 'Component/Definition', 'Component/Lookup', 'Util/Logger'], function(Interface, EventBus, Loader, Definition, Lookup, Logger) {

    describe('Component/Interface', function () {
    	
        beforeEach(function() {

        	spyOn(Lookup, 'lookupClass').and.callFake(function() {
        		return 'class';
        	});
        	
        	spyOn(Definition, 'get').and.callFake(function() {
        		return {
        			inputs: {
        				'input': null
        			},
        			outputs: {
        				'output': null
        			}
        		};
        	});

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

        it('On, Trigger, and Off (input)', function () {
        	var flag = false;
        	var foo = function() {
        		flag = true;
        	}
        	// Add listener
        	var shell = new Interface('id');
        	shell.on('input', foo, this);
        	// Trigger
        	shell.trigger('input');
        	expect(flag).toEqual(true);
        	// Remove listener
        	flag = false;
        	shell.off('input', foo, this);
        	shell.trigger('input');
        	expect(flag).toEqual(false);
        });

        it('On, Trigger, and Off (outputs)', function () {
        	var flag = false;
        	var foo = function() {
        		flag = true;
        	}
        	// Add listener
        	var shell = new Interface('id', true);
        	shell.on('output', foo, this);
        	// Trigger
        	shell.trigger('output');
        	expect(flag).toEqual(true);
        	// Remove listener
        	flag = false;
        	shell.off('output', foo, this);
        	shell.trigger('output');
        	expect(flag).toEqual(false);
        });

        it('On multiple times and trigger', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var shell = new Interface('id');
        	shell.on('input', foo, this);
        	shell.on('input', foo, this);
        	shell.trigger('input');
        	expect(counter).toEqual(2);
        });

        it('On and off multiple times', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var shell = new Interface('id');
        	shell.on('input', function() {}, this);
        	shell.on('input', function() {}, this);
        	shell.off('input')
        	expect(EventBus.isListener('id', 'input')).toEqual(false);
        });

        it('Once and trigger', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var context = {};
        	var shell = new Interface('id-once');
        	shell.once('input', foo, this);
        	shell.trigger('input');
        	shell.trigger('input');
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

        it('Trigger with invalid action', function () {
        	expect(function() {
        		var shell = new Interface('id');
        		shell.trigger(123);
        	}).toThrow();
        });

        it('Trigger with invalid payload (inputs)', function () {
        	expect(function() {
        		var shell = new Interface('id');
        		shell.trigger('input', 123);
        	}).toThrow();
        });

        it('Trigger with invalid payload (outputs)', function () {
        	expect(function() {
        		var shell = new Interface('id', true);
        		shell.trigger('input', 123);
        	}).toThrow();
        });
        
    });
    
});