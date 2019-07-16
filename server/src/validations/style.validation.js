const ValidationError = require('../helpers/classes/ValidationError');

exports.createValidation = (body) => {
  if (!body.name || !body.imageUrl) {
    return new ValidationError('Payload must contain at least the name and imageUrl field');
  }

  if (typeof body.name !== 'string' || typeof body.imageUrl !== 'string') {
    return new ValidationError('The name and imageUrl must be of type string');
  }
  return null;
};

exports.updateValidation = (body) => {
  if (!body.name || !body.imageUrl) {
    return new ValidationError('Payload must contain at least the name and imageUrl field');
  }

  if (typeof body.name !== 'string' || typeof body.imageUrl !== 'string') {
    return new ValidationError('The name and imageUrl must be of type string');
  }

  return null;
};

exports.addCollectionsValidation = (body) => {
  const { collectionIds } = body;

  if (!collectionIds) {
    return new ValidationError('Payload must contain at least the collectionIds field');
  }

  if (!collectionIds === 'object' || !(collectionIds instanceof Array)) {
    return new ValidationError('The collectionIds must be of type array');
  }

  return null;
};

exports.addClothesValidation = (body) => {
  const { clothIds } = body;

  if (!clothIds) {
    return new ValidationError('Payload must contain at least the clothIds field');
  }

  if (!clothIds === 'object' || !(clothIds instanceof Array)) {
    return new ValidationError('The clothIds must be of type array');
  }

  return null;
};
