Shell.include('Test/Component/Api', ['Component/Api', 'Component/Loader', 'Component/Lookup', 'Util/Logger', 'Util/ErrorHandler'], function(Api, Loader, Lookup, Logger, ErrorHandler) {

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
        	Shell.define('class-1', definition, constructor);
        	expect(Shell.debug.getDefinition('class-1')).toEqual(definition);
        	expect(Shell.debug.getConstructor('class-1')).toEqual(constructor);
        });

        it('Create', function () {
        	var definition = {
    			events: {
    				'show': {
    					payload: null
    				}
    			},
    			singleton: true
    		};
        	var constructor = function() {
        		this.ids = this.Shell().getComponents();
        	};
        	Shell.define('class-2', definition, constructor);
        	var shell = Shell.create('class-2');
        	expect(Loader.exist('class-2')).toEqual(true);
        	expect(Lookup.lookup('class-2')).toEqual(['class-2']);
        	var component = Loader.load('class-2');
        	expect(component.ids).toEqual(['class-2']);
        	expect(typeof component.Shell).toEqual('string');
        });

        it('Find', function () {
        	var definition = {
    			events: {
    				'show': {
    					payload: null
    				}
    			},
    			singleton: true
    		};
        	var constructor = function() {
            	var shell = Shell.find(this);
            	expect(shell.getComponents()).toEqual(['class-3']);
        	};
        	Shell.define('class-3', definition, constructor);
        	Shell.create('class-3');
        	var shell = Shell.find('class-3');
        	expect(shell.getComponents()).toEqual(['class-3']);
        	var component = Loader.load('class-3');
        	shell = Shell.find(component);
        	expect(shell.getComponents()).toEqual(['class-3']);
        });
        
    });
    
});