const fs = require('fs');
const path = require('path');
const joi = require('joi');

const { peopleSchema } = require('./people.schema');
const { calculateDistanceInKm, latSchema, lonSchema } = require('../utils');

const constructorParamsSchema = joi
  .object({
    people: peopleSchema,
    sort: joi.func()
  })
  .required()
  .options({ abortEarly: false, convert: false });

const peopleWithinParams = joi
  .object({
    lat: latSchema,
    lon: lonSchema,
    maxDistanceAwayInKm: joi.number().required(),
    country: joi.string()
  })
  .options({ abortEarly: false, convert: false });

function peopleWithin(params) {
  const { lat, lon, maxDistanceAwayInKm, country } = joi.attempt(params, peopleWithinParams);

  return this._people.filter(
    person =>
      calculateDistanceInKm({
        lat1: person.location.latitude,
        lon1: person.location.longitude,
        lat2: lat,
        lon2: lon
      }) <= maxDistanceAwayInKm && (country ? country === person.country : true)
  );
}

function PeopleService(params) {
  const { people, sort } = joi.attempt(params, constructorParamsSchema);

  if (sort) people.sort(sort);

  return {
    _people: people,
    peopleWithin
  };
}

module.exports = {
  peopleService: new PeopleService({
    people: JSON.parse(fs.readFileSync(path.join(__dirname, 'people.json'), 'utf-8')),
    sort: (person, nextPerson) => parseInt(nextPerson.value) - parseInt(person.value)
  }),
  PeopleService
};
