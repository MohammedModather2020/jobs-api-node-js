const jwt = require('jsonwebtoken');

exports.generateJwtToken = (id, name) => {
  return jwt.sign({ userId: id, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
