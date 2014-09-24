Shell.include('Test/Plugin/Manager', ['Plugin/Manager'], function(PluginMgr) {

    describe('Plugin.Manager', function () {
        
        it('Register plugin', function () {
           var initialized = 0;
           var intercepted = 0;
           var destroyed = 0;
           var testCount = 0;
           Shell.plugin.register('plugin', 'initialize', 'null', function() {
               initialized++;
           }, this);
           Shell.plugin.register('plugin', 'test', 'string', function() {
               intercepted++;
               testCount++
               return 'something nice';
           }, this);
           Shell.plugin.register('plugin', 'destroy', 'null', function() {
               destroyed++;
           }, this);
           
           Shell.define('shell', {}, function(shell) {
               shell.on('test', function(payload) {
                   expect(payload).toEqual('something nice');
               }, this);
           });
           Shell.create('shell')
           .trigger('test', 'blah')
           .destroy();
           expect(initialized).toEqual(1);
           expect(intercepted).toEqual(1);
           expect(testCount).toEqual(1);
           expect(destroyed).toEqual(1);
        });
        
        
    });
    
});