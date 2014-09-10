Shell.include('Test/Util/Validator', ['Util/Validator'], function (Validator) {

	describe('Util/Validator.validate', function () {

		it('basic structure validation success', function () {
			expect(Validator.validate({
				a: 'string',
				b: 'object'
			}, {
				a: "wow",
				b: {}
			})).toEqual(true);
		});

		it('basic structure validation failure', function () {
			expect(Validator.validate({
				a: 'number',
				b: 'string',
				c: 'object'
			}, {
				a: 1,
				b: 'test string',
				c: 'bad string'
			})).toEqual(false);
		});

		it('complex structure validation success', function () {
			expect(Validator.validate({
				a: 'string',
				b: {
					c: 'string'
				}
			}, {
				a: 'test string 1',
				b: {
					c: 'test string 2'
				}
			})).toEqual(true);
		});

		it('complex structure validation failure', function () {
			expect(Validator.validate({
				a: 'string',
				b: {
					c: {
						d: 'number',
						e: {
							f: 'object'
						}
					}
				}
			}, {
				a: 'test string 1',
				b: {
					c: {
						d: 12,
						e: {
							f: {}
						}
					}
				}
			})).toEqual(true);
		});

	});

});