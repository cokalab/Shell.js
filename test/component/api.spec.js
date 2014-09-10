Sheru.include('Test/Component/Api', ['Component/Api', 'Component/Loader', 'Component/Lookup', 'Util/Logger', 'Util/ErrorHandler'], function(Api, Loader, Lookup, Logger, ErrorHandler) {

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
        	Sheru.define('class-1', definition, constructor);
        	expect(Sheru.debug.getDefinition('class-1')).toEqual(definition);
        	expect(Sheru.debug.getConstructor('class-1')).toEqual(constructor);
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
        		this.ids = this.Sheru().getComponents();
        	};
        	Sheru.define('class-2', definition, constructor);
        	var shell = Sheru.create('class-2');
        	expect(Loader.exist('class-2')).toEqual(true);
        	expect(Lookup.lookup('class-2')).toEqual(['class-2']);
        	var component = Loader.load('class-2');
        	expect(component.ids).toEqual(['class-2']);
        	expect(typeof component.Sheru).toEqual('string');
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
            	var shell = Sheru.find(this);
            	expect(shell.getComponents()).toEqual(['class-3']);
        	};
        	Sheru.define('class-3', definition, constructor);
        	Sheru.create('class-3');
        	var shell = Sheru.find('class-3');
        	expect(shell.getComponents()).toEqual(['class-3']);
        	var component = Loader.load('class-3');
        	shell = Sheru.find(component);
        	console.log(shell);
        	expect(shell.getComponents()).toEqual(['class-3']);
        });
        
    });
    
});