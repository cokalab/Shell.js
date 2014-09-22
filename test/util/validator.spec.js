Shell.include('Test/Util/Validator', ['Util/Validator'], function (Validator) {
    "use strict";
    
	describe('Util/Validator.validate', function () {

		it('Validate native type', function () {
			expect(Validator.validate('string', '123')).toEqual(true);
		});

		it('Validate native type and fail', function () {
			expect(Validator.validate('string', 123)).toEqual(false);
		});

		it('Validate simple structure', function () {
			expect(Validator.validate({
				a: 'string',
				b: 'object'
			}, {
				a: "wow",
				b: {}
			})).toEqual(true);
		});

		it('Validate simple structure and fail', function () {
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

		it('Validate complex structure', function () {
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

		it('Validate complex structure and fail', function () {
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
				a: '123',
				b: {
					c: {
						d: 'number',
						e: {
							f: 'object'
						}
					}
				}
			})).toEqual(false);
		});

		
	});});