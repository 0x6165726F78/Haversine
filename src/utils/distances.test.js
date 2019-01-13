const { calculateDistanceInKm } = require('./distances');

describe('calculateDistanceInKm', () => {
  const coord1 = { lat: 6.33607, lon: -75.56119 };
  const coord2 = { lat: 6.17136, lon: -75.5882 };

  test('should throw an error when called without parameters', () => {
    try {
      calculateDistanceInKm();
    } catch (err) {

      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }
  });

  test('should throw an error for any `lan` or `lon` provided that its invalid', () => {
    try {
      calculateDistanceInKm({
        lat1: -500,
        lon1: 200,
        lon2: 'b'
      });
    } catch (err) {

      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(4);
    }

    try {
      calculateDistanceInKm({
        lat1: coord1.lat,
        lon1: coord1.lon,
        lat2: coord2.lat,
        lon2: String(coord2.lon),
      });
    } catch (err) {

      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }
  });

  test('should return distance in Km, given a valid pair of coordinates', () => {
    const expectedDistance = 18.5618829421293;

    const distance = calculateDistanceInKm({
      lat1: coord1.lat,
      lon1: coord1.lon,
      lat2: coord2.lat,
      lon2: coord2.lon
    });

    expect(distance).toBe(expectedDistance);
  });
})