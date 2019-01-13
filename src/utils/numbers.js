const joi = require('joi');

const paramsSchema = joi.array().items(
  joi.number().required()
).required().options({ abortEarly: false, convert: false });

function calculateAverageValue (values) {
  joi.attempt(values, paramsSchema);

  const numValues = values.length;

  return values.reduce((result, nextNumber, index) => {
    const lastOperation = index === numValues - 1;

    result += nextNumber;

    return lastOperation
      ? result / numValues
      : result;
  }, 0);
}

module.exports = {
  calculateAverageValue,
};