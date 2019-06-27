const ValidationError = require('../helpers/classes/ValidationError');

exports.loginValidation = (body) => {
  if (!body.email || !body.password) {
    return new ValidationError('Payload must contain at least the email and password fields');
  }

  if (typeof body.email !== 'string' || typeof body.password !== 'string') {
    return new ValidationError('The email and password must be of type string');
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(body.email)) {
    return new ValidationError('The email field must be a valid email');
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(body.password)) {
    return new ValidationError('The password field must be a valid password');
  }
  return null;
};
