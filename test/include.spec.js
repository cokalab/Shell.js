describe('Shell.include', function () {
	
    it('Include core module without dependency', function () {
    	var status = false;
    	Shell.include('core-1', null, function() {
    		status = true;
    	});
    	expect(status).toEqual(true);
    });
	
    it('Include core module with one dependency', function () {
    	var status = false;
    	Shell.include('core-2', null, function() {
    		return 'core-2'
    	});
    	Shell.include('core-3', ['core-2'], function(core2) {
    		expect(core2).toEqual('core-2');
    		status = true;
    	});
    	expect(status).toEqual(true);
    });

    it('Include core module with multiple dependencies', function () {
    	var status = false;
    	Shell.include('core-4', null, function() {
    		return 'core-4'
    	});
    	Shell.include('core-5', null, function() {
    		return 'core-5'
    	});
    	Shell.include('core-6', ['core-4', 'core-5'], function(core4, core5) {
    		expect(core4).toEqual('core-4');
    		expect(core5).toEqual('core-5');
    		status = true;
    	});
    	expect(status).toEqual(true);
    });

    it('Include core module with a bad id', function () {
    	expect(function() {
    		Shell.include(12345, null, function() {});
    	}).toThrow();
    });

    it('Include core module with a bad dependency list', function () {
    	expect(function() {
    		Shell.include('core-7', 12345, function() {});
    	}).toThrow();
    });

    it('Include core module with a bad constructor function', function () {
    	expect(function() {
    		Shell.include('core-7', null, 12345);
    	}).toThrow();
    });
     
});