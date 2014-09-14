Shell.include('Test/Util/ErrorHandler', [ 'Util/ErrorHandler', 'Util/Logger' ],
		function(ErrorHandler, Logger) {

			describe('Util/ErrorHandler', function() {

				beforeEach(function() {
		            ErrorHandler.disable();
				});

				afterEach(function() {
					Logger.enable();
					ErrorHandler.disable();
				});

				it('Ignore error (Invoked from module)', function() {
					spyOn(Logger, 'error');
					ErrorHandler.disable();
					expect(function() {
						ErrorHandler.execute(function() {
							throw 'exception';
						}, [], this);
					}).toThrow();
					expect(Logger.error).not.toHaveBeenCalled()
				});

				it('Ignore error (Invoked from global debugger)', function() {
					spyOn(Logger, 'error');
					Shell.debug.disableErrorHandler();
					expect(function() {
						ErrorHandler.execute(function() {
							throw 'exception';
						}, [], this);
					}).toThrow();
					expect(Logger.error).not.toHaveBeenCalled()
				});

				it('Throw error (Invoked from module)', function() {
					spyOn(Logger, 'error');
					ErrorHandler.enable();
					ErrorHandler.execute(function() {
						throw 'exception';
					}, [], this);
					expect(Logger.error).toHaveBeenCalled()
				});

				it('Throw error (Invoked from global debugger)', function() {
					spyOn(Logger, 'error');
					Shell.debug.enableErrorHandler();
					ErrorHandler.execute(function() {
						throw 'exception';
					}, [], this);
					expect(Logger.error).toHaveBeenCalled()
				});

			});

		});