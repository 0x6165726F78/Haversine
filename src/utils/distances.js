const joi = require('joi');

const { latSchema, lonSchema } = require('./schemas');

const paramsSchema = joi.object({
  lat1: latSchema,
  lon1: lonSchema,
  lat2: latSchema,
  lon2: lonSchema,
}).required().options({ abortEarly: false, convert: false });

function calculateDistanceInKm(params) {
  const { lat1, lon1, lat2, lon2 } = joi.attempt(params, paramsSchema);

  const oneDegreeInRadians = Math.PI / 180;
  const radiusEarthInKm = 6372.795477598;

  const diffLatInRadians = (lat2 - lat1) * oneDegreeInRadians;
  const diffLonInRadians = (lon2 - lon1) * oneDegreeInRadians;

  const lat1InRadians = lat1 * oneDegreeInRadians;
  const lat2InRadians = lat2 * oneDegreeInRadians;

  const innerFormula = (Math.sin(diffLatInRadians/2) ** 2) +
    (Math.cos(lat1InRadians) * Math.cos(lat2InRadians) * (Math.sin(diffLonInRadians/2) ** 2));

  const distanceInKm = 2 * radiusEarthInKm * Math.asin(Math.sqrt(innerFormula));

  return distanceInKm;
}

module.exports = {
  calculateDistanceInKm,
};