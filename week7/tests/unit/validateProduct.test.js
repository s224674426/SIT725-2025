// tests/unit/validateProduct.test.js
const validateProduct = require('../../utils/validateProduct');

describe('validateProduct()', () => {
  test('valid product passes', () => {
    const { ok, errors } = validateProduct({ name: 'Keyboard', price: 49.99 });
    expect(ok).toBe(true);
    expect(errors).toHaveLength(0);
  });

  test('invalid product fails with reasons', () => {
    const { ok, errors } = validateProduct({ name: 'ab', price: -1 });
    expect(ok).toBe(false);
    expect(errors).toEqual(
      expect.arrayContaining(['name min length 3', 'price must be >= 0'])
    );
  });
});
