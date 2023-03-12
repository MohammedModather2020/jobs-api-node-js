const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index.error');

exports.generateJwtToken = (id, name) => {
  return jwt.sign({ userId: id, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.verifyJwtToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UnauthenticatedError('token is required');

  if (!authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError("token doesn't start with Bearer ");

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid, please try again');
  }
};
