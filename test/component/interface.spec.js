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
            var shell;
        	shell = new Interface('id').initialize();
        	expect(shell.getComponents()).toEqual(['id']);
        	shell = new Interface(['1', '2', '3']);
        	expect(shell.getComponents()).toEqual(['1', '2', '3']);
        });

        it('On, Trigger, and Off (input)', function () {
        	var flag = false;
        	var foo = function() {
        		flag = true;
        	};
        	// Add listener
        	var shell = new Interface('id').initialize();
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
        	};
        	// Add listener
        	var shell = new Interface('id', true).initialize();
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
        	};
        	var shell = new Interface('id').initialize();
        	shell.on('input', foo, this);
        	shell.on('input', foo, this);
        	shell.trigger('input');
        	expect(counter).toEqual(2);
        });

        it('On and off multiple times', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	};
        	var shell = new Interface('id').initialize();
        	shell.on('input', function() {}, this);
        	shell.on('input', function() {}, this);
        	shell.off('input');
        	expect(EventBus.isListener('id', 'input')).toEqual(false);
        });

        it('Once and trigger', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	};
        	var context = {};
        	var shell = new Interface('id-once').initialize();
        	shell.once('input', foo, this);
        	shell.trigger('input');
        	shell.trigger('input');
        	expect(counter).toEqual(1);
        });

        it('Destroy', function() {
            var destroyed = false;
            EventBus.addListener('id', 'Destroy', function() {
                destroyed = true;
            });
        	var shell = new Interface('id').initialize();
        	shell.destroy();
        	expect(Loader.exist('id')).toEqual(false);
        	expect(destroyed).toEqual(true);
        });

        it('Trigger with invalid action', function () {
        	expect(function() {
        		var shell = new Interface('id').initialize();
        		shell.trigger(123);
        	}).toThrow();
        });

        it('Trigger with invalid payload (inputs)', function () {
        	expect(function() {
        		var shell = new Interface('id').initialize();
        		shell.trigger('input', 123);
        	}).toThrow();
        });

        it('Trigger with invalid payload (outputs)', function () {
        	expect(function() {
        		var shell = new Interface('id', true).initialize();
        		shell.trigger('input', 123);
        	}).toThrow();
        });

        it('On with invalid context', function () {
        	expect(function() {
        		var shell = new Interface('id').initialize();
        		shell.on('input', function() {});
        	}).toThrow();
        });
        
    });
    
});