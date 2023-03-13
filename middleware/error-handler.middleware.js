const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../errors/custom-api.error');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ code: 0, msg: err.message });
  } else if (err.code && err.code == 11000) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      code: 0,
      msg: `Duplicated value entered for ${Object.keys(
        err.keyValue
      )} field, Please choose another value`,
    });
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ code: 0, msg: err.message });
  }
};

module.exports = errorHandlerMiddleware;
