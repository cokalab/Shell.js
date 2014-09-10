Shell.include('Test/Event/Listener', ['Event/Event', 'Event/Listener'], function(Event, Listener) {

    describe('Event.Listener', function () {
        
        it('Execute', function () {
        	var tester = {};
        	tester.callback = function() {};
        	spyOn(tester, 'callback');
        	var listener = new Listener(tester.callback, tester);
        	listener.execute(new Event('test', 'test', 'test'));
        	expect(tester.callback).toHaveBeenCalled();
        });

        it('Compare', function () {
        	var tester = {};
        	tester.callback = function() {};
        	spyOn(tester, 'callback');
        	var listener = new Listener(tester.callback, tester);
        	expect(listener.compare(tester.callback, tester)).toEqual(true);
        });
        
    });
    
});