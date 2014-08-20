Shell.include('Test/Event/Event', ['Event/Event'], function(Event) {

    describe('Event.Event', function () {
        
        it('Get channel', function () {
        	var e = new Event('channel', 'action', 'data');
            expect(e.getChannel()).toEqual('channel');
        });
        
        it('Get action', function () {
        	var e = new Event('channel', 'action', 'data');
            expect(e.getAction()).toEqual('action');
        });
        
        it('Get payload', function () {
        	var e = new Event('channel', 'action', 'data');
            expect(e.getPayload()).toEqual('data');
        });
        
        it('Create event with invalid channel', function () {
        	expect(function() {
        		new Event(null, 'action', 'data');
        	}).toThrow();
        });
        
        it('Create event with invalid action', function () {
        	expect(function() {
        		new Event('channel', 123, 'data');
        	}).toThrow();
        });
        
        it('Create event with invalid payload', function () {
        	expect(function() {
        		new Event('channel', 'action', function() {});
        	}).toThrow();
        });

    });
    
});