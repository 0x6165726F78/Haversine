const joi = require('joi');
const { latSchema, lonSchema } = require('../utils');

const personSchema = joi.object({
  id: joi.string().required(),
  value: joi.number().required(),
  name: joi.object({
    first: joi.string().required(),
    last: joi.string().required()
  }).required(),
  location: joi.object({
    latitude: latSchema,
    longitude: lonSchema,
  }).required(),
  company: joi.string().required(),
  email: joi.string().required(),
  address: joi.string().required(),
  country: joi.string().required(),
}).required().options({ convert: true });

const peopleSchema = joi.array().items(personSchema).required();

module.exports = {
  personSchema,
  peopleSchema,
};