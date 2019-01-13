const { PeopleService } = require('./people.service');
const { peopleMock } = require('./people.mocks');

describe('[PeopleService] constructor', () => {
  test('should throw an error when an array of people its not provided', () => {
    try {
      new PeopleService({})
    } catch (err) {
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }

    try {
      new PeopleService({ people: {} })
    } catch (err) {
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }
  });

  test('should throw an error when an empty array of people its provided', () => {
    try {
      new PeopleService({ people: [] });
    } catch (err) {
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }
  })

  test('should throw an error for any incosistence in the array of people provided', () => {
    try {
      new PeopleService({ people: [{}] })
    } catch (err) {
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(9);
    }
  });

  test('should have a instance property `_person` after successfully running', () => {
    const people = [...peopleMock];
    const peopleService = new PeopleService({ people });
    expect(Array.isArray(peopleService._people)).toBe(true);
    expect(peopleService._people.length).toBe(people.length);
  });

  test('should throw an error if the `sort` property that its provided is not a function', () => {
    try {
      const people = [...peopleMock];
      new PeopleService({ people, sort: [] });
    } catch (err) {
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(1);
    }
  })

  test('should successfully run the `sort` function if provided', () => {
    const people = [...peopleMock];
    const sort = jest.fn();

    new PeopleService({
      people,
      sort,
    });

    expect(sort).toBeCalled();
  });
})

describe('[PeopleService] peopleWithin', () => {
  const peopleService = new PeopleService({ people: [...peopleMock] });

  test('should throw an error for any missing required param', () => {
    try {
      peopleService.peopleWithin({})
    } catch(err) {
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details.length).toBe(3);
    }

  });

  test('should return the right subset of people', () => {
    const params = {
      lat: 51.450167,
      lon: -2.594678,
      maxDistanceAwayInKm: 100,
    };

    const peopleFound = peopleService.peopleWithin(params);

    expect(peopleFound.length).toBe(3);

    const peopleFound2 = peopleService.peopleWithin({
      ...params,
      country: 'england',
    });

    expect(peopleFound2.length).toBe(2);
  });
});



