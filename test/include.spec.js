describe('Shell.exportMethod', function () {
	
	noop = function() {};
	
    it('One level namespace', function () {
    	Shell.exportMethod('level1', noop);
    	expect(Shell.level1).toEqual(noop);
    });
    
    it('Two level namespace', function () {
    	Shell.exportMethod('levelA.levelB', noop);
    	expect(Shell.levelA.levelB).toEqual(noop);
    });

    it('Undefined namespace', function () {
    	Shell.exportMethod('levelOne', noop);
    	expect(Shell.levelOne.levelTwo).not.toBeDefined(); 
    });

    it('Invalid namespace', function () {
    	expect(function() {
    		Shell.exportMethod(123, noop);
    	}).toThrow(); 
    });

    it('Invalid method', function () {
    	expect(function() {
    		Shell.exportMethod('Level01', null);
    	}).toThrow(); 
    });
    
});