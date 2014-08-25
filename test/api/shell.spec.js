Shell.include('Test/Api/Shell', ['Api/Shell', 'Event/EventBus', 'Component/Loader', 'Util/Logger'], function(ShellApi, EventBus, Loader, Logger) {

    describe('Api/Shell', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });

        it('Construct', function () {
        	var shell = new ShellApi('id');
        	expect(shell.getComponents()).toEqual(['id']);
        	var shell = new ShellApi(['1', '2', '3']);
        	expect(shell.getComponents()).toEqual(['1', '2', '3']);
        });

        it('Construct', function () {
        	var shell = new ShellApi('id');
        	expect(shell.getComponents()).toEqual(['id']);
        	var shell = new ShellApi(['1', '2', '3']);
        	expect(shell.getComponents()).toEqual(['1', '2', '3']);
        });

        it('Add listener, remove listener, and trigger events', function () {
        	var flag = false;
        	var foo = function() {
        		flag = true;
        	}
        	// Add listener
        	var shell = new ShellApi('id');
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

        it('Add multiple listeners and trigger events', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var shell = new ShellApi('id');
        	shell.on('act', foo, this);
        	shell.on('act', foo, this);
        	shell.trigger('act');
        	expect(counter).toEqual(2);
        });

        it('Add and remove multiple listeners', function () {
        	var counter = 0;
        	var foo = function() {
        		counter ++;
        	}
        	var shell = new ShellApi('id');
        	shell.on('act', function() {}, this);
        	shell.on('act', function() {}, this);
        	shell.off('act')
        	expect(EventBus.isListener('id', 'act')).toEqual(false);
        });

        it('Destroy', function() {
        	var shell = new ShellApi('id');
        	shell.destroy();
        	expect(Loader.exist('id')).toEqual(false);
        });
        
    });
    
});