const tv4 = require('tv4');
const { logger } = require('../commons/logger');
const copybook = require('./schemas/copybook.json');

const Validator = {};
const self = Validator;

tv4.addSchema('copybook', copybook);

Validator.getErrorMessages = (result) => {
  const errors = [];
  result.errors.forEach((error) => {
    errors.push(`${error.dataPath ? `${error.dataPath} - ` : ''}${error.message}`);
  });
  return errors;
};

const helpError = (errors, body) => errors.map((err) => {
  const index = err.match(/^\/email\/(\w+)/);
  return index ? `${err}. ${body.name}` : err;
});

Validator.formatErrorMessage = (result, body) => {
  const errors = self.getErrorMessages(result);
  const newErrors = helpError(errors, body);
  return `${newErrors.join('.\n')}.`;
};

Validator.validate = (json, schemaId) => tv4.validateMultiple(json, schemaId);

const defaultValidation = (req, res, options, next) => {
  const result = Validator.validate(req.body, options.schema);
  if (!result.valid) {
    logger.error(options.message, result);
    if (options.responseBody === 'array') {
      return res.status(400).send(Validator.getErrorMessages(result));
    }
    return res.status(400).send(Validator.formatErrorMessage(result, req.body));
  }
  next();
};

Validator.copybook = (req, res, next) => {
  defaultValidation(req, res, {
    message: 'Validation error in copybook: %j',
    schema: copybook
  }, next);
};

Validator.getSchema = tv4.getSchema;

module.exports = Validator;
