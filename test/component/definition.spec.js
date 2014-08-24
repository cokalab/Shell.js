Shell.include('Test/Component/Definition', ['Component/Definition', 'Util/Logger'], function(DefinitionMgr, Logger) {

    describe('Component/Definition', function () {

        beforeEach(function() {
            Logger.disable();
        });

        afterEach(function() {
            Logger.enable();
        });
        
        it('Set and get', function () {
        	var definition = {
    			events: {
    				'show': {
    					payload: null
    				}
    			}
    		};
        	DefinitionMgr.addRequiredDefinitionField('events');
        	DefinitionMgr.set('class', definition);
        	expect(DefinitionMgr.get('class')).toEqual(definition);
        });
        
    });
    
});