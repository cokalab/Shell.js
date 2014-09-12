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

        it('Get all keys', function () {
        	var registry = new  Registry('test');
        	registry.set('key1', 'object1');
        	registry.set('key2', 'object2');
        	expect(registry.getKeys()).toEqual(['key1', 'key2']);
        });

        it('Get key matching object', function () {
        	var registry = new  Registry('test');
        	registry.set('key', 'object');
        	expect(registry.getKey('object')).toEqual('key');
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