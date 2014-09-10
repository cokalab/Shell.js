Sheru.include('Test/Util/ErrorHandler', [ 'Util/ErrorHandler', 'Util/Logger' ],
		function(ErrorHandler, Logger) {

			describe('Util/ErrorHandler', function() {

				beforeEach(function() {
		            ErrorHandler.disable();
				});

				afterEach(function() {
					Logger.enable();
					ErrorHandler.disable();
				});

				it('Ignore error', function() {
					ErrorHandler.disable();
					expect(function() {
						ErrorHandler.execute(function() {
							throw 'exception';
						}, [], this);
					}).toThrow();
				});

				it('catch error', function() {
					spyOn(console, 'error');
					ErrorHandler.enable();
					Logger.enable();
					ErrorHandler.execute(function() {
						throw 'exception';
					}, [], this);
					expect(console.error).toHaveBeenCalled()
				});

			});

		});