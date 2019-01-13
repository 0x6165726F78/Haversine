const { calculateAverageValue } = require('./numbers');

describe('calculateAverageValue', () => {
  test('should throw an error when called without parameters', () => {
    try {
      calculateAverageValue();
    } catch (err) {

      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }
  });

  test('should throw an error for any invalid params', () => {
    try {
      calculateAverageValue([1, '2', undefined, 3])
    } catch (err) {

      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(2);
    }
  });

  test('should return the average value, given an array of numbers', () => {
    const avgValue = calculateAverageValue([1, 2, 3, 5]);
    expect(avgValue).toBe(2.75);
  });
})