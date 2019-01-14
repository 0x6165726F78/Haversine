const joi = require('joi');

const paramsSchema = joi.array().items(
  joi.number().required()
).required().options({ abortEarly: false, convert: false });

function calculateAverageValue (values, maxNumDecimals = 2) {
  joi.attempt(values, paramsSchema);

  const numValues = values.length;
  const padding = 10 ** maxNumDecimals;

  return values.reduce((result, nextNumber, index) => {
    const lastOperation = index === numValues - 1;

    result += Math.round(nextNumber.toFixed(maxNumDecimals) * padding);

    return lastOperation
      ? ((result / padding) / numValues)
      : result;
  }, 0);
}

module.exports = {
  calculateAverageValue,
};