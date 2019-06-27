const ValidationError = require('../helpers/classes/ValidationError');

exports.createValidation = (body) => {
  if (!body.email || !body.firstName || !body.lastName || !body.passowrd) {
    return new ValidationError('Payload must contain at least the email, firstName, lastName and password fields');
  }

  if (
    typeof body.email !== 'string'
    || typeof body.firstName !== 'string'
    || typeof body.lastName !== 'string'
    || typeof body.passowrd !== 'string'
  ) {
    return new ValidationError('The email, firstName, lastName and password must be of type string');
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError('The email field must be a valid email');
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) {
    return new ValidationError('The password field must be a valid password');
  }
  return null;
};
