const joi = require('joi');

const latSchema = joi.number().min(-90).max(90).required();
const lonSchema = joi.number().min(-180).max(180).required();

module.exports = {
  latSchema,
  lonSchema,
};