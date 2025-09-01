const priceWithTax = require('../../utils/priceWithTax');

describe('priceWithTax()', () => {
  test('adds 10% GST by default', () => {
    expect(priceWithTax(100)).toBe(110.0);
  });

  test('throws for negative amount', () => {
    expect(() => priceWithTax(-1)).toThrow('Invalid amount');
  });
});
