const { peopleService } = require('./people');
const { calculateAverageValue } = require('./utils');

const Bristol = {
  lat: 51.450167,
  lon: -2.594678
};

const values = peopleService.peopleWithin({
  lat: Bristol.lat,
  lon: Bristol.lon,
  maxDistanceAwayInKm: 200,
}).map(({ value }) => parseInt(value));

const avgValue = calculateAverageValue(values);

console.log(`The average customer value of all people living within 200km of Bristol is: ${avgValue}`);