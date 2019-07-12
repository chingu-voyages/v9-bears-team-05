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

exports.addClosetsValidation = (body) => {
  const { closetIds } = body;

  if (!closetIds) {
    return new ValidationError('Payload must contain at least the closetIds field');
  }

  if (!closetIds === 'object' || !(closetIds instanceof Array)) {
    return new ValidationError('The closetIds must be of type array');
  }

  return null;
};
