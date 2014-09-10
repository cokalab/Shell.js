Shell.include('Test/Util/Registry', ['Util/Registry', 'Util/Logger'], function(Registry, Logger) {

    describe('Util.Registry', function () {
        
    	beforeEach(function() {
    		Logger.disable();
    	});

    	afterEach(function() {
    		Logger.enable();
    	});
    	
        it('Set and get', function () {
        	var registry = new  Registry('test');
        	expect(registry.get('key')).toEqual(null);
        	registry.set('key', 'object');
        	expect(registry.get('key')).toEqual('object');
        });
    	
        it('Remove object', function () {
        	var registry = new  Registry('test');
        	registry.set('key', 'object');
        	expect(registry.get('key')).toEqual('object');
        	registry.remove('key');
        	expect(registry.get('key')).toEqual(null);
        });
    	
        it('Exist', function () {
        	var registry = new  Registry('test');
        	expect(registry.exist('key')).toEqual(false);
        	registry.set('key', 'object');
        	expect(registry.exist('key')).toEqual(true);
        });
     
    });
    
});