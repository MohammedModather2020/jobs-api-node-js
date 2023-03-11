const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../errors/custom-api.error');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ code: 0, msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ code: 0, msg: err.message });
};

module.exports = errorHandlerMiddleware;
