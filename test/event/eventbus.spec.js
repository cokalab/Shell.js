Shell.include('Test/Event/EventBus', ['Event/EventBus', 'Event/Event', 'Event/Listener', 'Util/Logger'], function(EventBus, Event, Listener, Logger) {

    describe('Event.EventBus', function () {

    	beforeEach(function() {
    		Logger.disable();
    	});

    	afterEach(function() {
    		Logger.enable();
    		EventBus.reset();
    	});
    	
        it('Add a listener', function () {
        	var noop = function() {};
        	EventBus.addListener('test1', 'test1', noop, this);
        	expect(EventBus.isListener('test1', 'test1', noop, this)).toEqual(true);
        });

        it('Add multiple listener', function () {
        	var noop1 = function() {};
        	var noop2 = function() {};
        	EventBus.addListener('test1', 'test1', noop1, this);
        	EventBus.addListener('test1', 'test2', noop1, this);
        	EventBus.addListener('test2', 'test1', noop2, this);
        	EventBus.addListener('test2', 'test2', noop2, this);
        	expect(EventBus.isListener('test1', 'test1', noop1, this)).toEqual(true);
        	expect(EventBus.isListener('test1', 'test2', noop1, this)).toEqual(true);
        	expect(EventBus.isListener('test2', 'test1', noop2, this)).toEqual(true);
        	expect(EventBus.isListener('test2', 'test2', noop2, this)).toEqual(true);
        });

        it('Remove a listener', function () {
        	var noop = function() {};
        	EventBus.addListener('test1', 'test1', noop, this);
        	EventBus.removeListener('test1', 'test1', noop, this);
        	expect(EventBus.isListener('test1', 'test1', noop, this)).toEqual(false);
        });

        it('Remove listeners', function () {
        	var noop1 = function() {};
        	var noop2 = function() {};
        	EventBus.addListener('test1', 'test1', noop1, this);
        	EventBus.addListener('test1', 'test1', noop2, this);
        	EventBus.removeListeners('test1', 'test1');
        	expect(EventBus.isListener('test1', 'test1', noop1, this)).toEqual(false);
        	expect(EventBus.isListener('test1', 'test1', noop2, this)).toEqual(false);
        });
        
    });
    
});