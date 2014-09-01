Shell.include('Test/Component/Api', ['Component/Api', 'Util/Logger', 'Util/ErrorHandler'], function(Api, Logger, ErrorHandler) {

    describe('Component/Api', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });

        it('Define', function () {
        	var definition = {
    			events: {
    				'show': {
    					payload: null
    				}
    			}
    		};
        	var constructor = function() {};
        	Shell.define('class', definition, constructor);
        	expect(Shell.debug.getDefinition('class')).toEqual(definition);
        	expect(Shell.debug.getConstructor('class')).toEqual(constructor);
        });

        it('Create', function () {
        	var definition = {
    			events: {
    				'show': {
    					payload: null
    				}
    			}
    		};
        	var constructor = function() {};
        	Shell.define('class', definition, constructor);
        	var shell = Shell.create('class');
        });
        
    });
    
});