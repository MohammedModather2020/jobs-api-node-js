const BadRequestError = require('./bad-request.error');
const CustomAPIError = require('./custom-api.error');
const NotFoundError = require('./not-found.error');
const UnauthenticatedError = require('./unauthenticated.error');

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
