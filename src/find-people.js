const path = require('path');
const fs = require('fs');

const { peopleService } = require('./people');

const Bristol = {
  lat: 51.450167,
  lon: -2.594678
};

const peopleWithin100KmBristol = peopleService.peopleWithin({
  lat: Bristol.lat,
  lon: Bristol.lon,
  maxDistanceAwayInKm: 100,
  country: 'england',
})
.map(person => ({
  id: person.id,
  name: `${person.name.first} ${person.name.last}`,
  value: person.value,
  email: person.email,
}));

fs.writeFileSync(
  path.join(__dirname, 'people-found.json'),
  JSON.stringify(peopleWithin100KmBristol, null, '\t')
);
