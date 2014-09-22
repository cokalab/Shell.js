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
        	EventBus.addListener('channel', 'action', noop, this);
        	expect(EventBus.isListener('channel', 'action', noop, this)).toEqual(true);
        });

        it('Add multiple listener', function () {
        	var noop1 = function() {};
        	var noop2 = function() {};
        	EventBus.addListener('channel1', 'action1', noop1, this);
        	EventBus.addListener('channel1', 'action2', noop1, this);
        	EventBus.addListener('channel2', 'action1', noop2, this);
        	EventBus.addListener('channel2', 'action2', noop2, this);
        	expect(EventBus.isListener('channel1', 'action1', noop1, this)).toEqual(true);
        	expect(EventBus.isListener('channel1', 'action2', noop1, this)).toEqual(true);
        	expect(EventBus.isListener('channel2', 'action1', noop2, this)).toEqual(true);
        	expect(EventBus.isListener('channel2', 'action2', noop2, this)).toEqual(true);
        });

        it('Remove a listener', function () {
        	var noop = function() {};
        	EventBus.addListener('channel', 'action', noop, this);
        	expect(EventBus.isListener('channel', 'action', noop, this)).toEqual(true);
        	EventBus.removeListener('channel', 'action', noop, this);
        	expect(EventBus.isListener('channel', 'action', noop, this)).toEqual(false);
        });

        it('Remove listeners (channel and action)', function () {
        	var noop1 = function() {};
        	var noop2 = function() {};
        	EventBus.addListener('channel', 'action', noop1, this);
        	EventBus.addListener('channel', 'action', noop2, this);
        	EventBus.removeListeners('channel', 'action');
        	expect(EventBus.isListener('channel', 'action', noop1, this)).toEqual(false);
        	expect(EventBus.isListener('channel', 'action', noop2, this)).toEqual(false);
        });

        it('Remove listeners (channel only)', function () {
            var noop1 = function() {};
            var noop2 = function() {};
            EventBus.addListener('channel', 'action1', noop1, this);
            EventBus.addListener('channel', 'action2', noop2, this);
            EventBus.removeListeners('channel');
            expect(EventBus.isListener('channel', 'action1', noop1, this)).toEqual(false);
            expect(EventBus.isListener('channel', 'action2', noop2, this)).toEqual(false);
        });

        it('Trigger event (multiple listeners)', function () {
            var tester = {};
            tester.callback1 = function() {};
            tester.callback2 = function() {};
            spyOn(tester, 'callback1');
            spyOn(tester, 'callback2');
            EventBus.addListener('channel', 'action', tester.callback1, tester);
            EventBus.addListener('channel', 'action', tester.callback2, tester);
            EventBus.trigger('channel', 'action');
            expect(tester.callback1).toHaveBeenCalled();
            expect(tester.callback2).toHaveBeenCalled();
        });

        it('Interceptor', function () {
            var tester = {};
            var count = 0;
            tester.callback1 = function(data) {
                return 123;
            };
            tester.callback2 = function(data) {};
            spyOn(tester, 'callback1').and.callFake(function() {
                return 123;
            });
            spyOn(tester, 'callback2');
            EventBus.addListener('channel', 'action', tester.callback2, tester);
            EventBus.addInterceptor('Interceptor', tester.callback1, tester);
            EventBus.trigger('channel', 'action');
            expect(tester.callback1).toHaveBeenCalled();
            expect(tester.callback2).toHaveBeenCalledWith(123);
            
        });

        it('Reset', function () {
            var noop = function() {};
            EventBus.addListener('channel', 'action', noop, this);
            expect(EventBus.isListener('channel', 'action', noop, this)).toEqual(true);
            EventBus.reset();
            expect(EventBus.isListener('channel', 'action', noop, this)).toEqual(false);
        });

    });
    
});