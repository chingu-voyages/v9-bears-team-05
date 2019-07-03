const ValidationError = require('../helpers/classes/ValidationError');

exports.createValidation = (body) => {
  if (!body.name) {
    return new ValidationError('Payload must contain at least the name field');
  }

  if (typeof body.name !== 'string') {
    return new ValidationError('The name must be of type string');
  }
  return null;
};

exports.updateValidation = (body) => {
  if (!body.name) {
    return new ValidationError('Payload must contain at least the name field');
  }

  if (typeof body.name !== 'string') {
    return new ValidationError('The name must be of type string');
  }

  return null;
};
