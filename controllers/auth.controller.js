const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const BadRequestError = require('../errors/bad-request.error');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    throw new BadRequestError('name is require');
  }
  if (!email) {
    throw new BadRequestError('email is require');
  }
  if (!password) {
    throw new BadRequestError('password is require');
  }

  const user = await User.create({ name, email, password });

  const token = jwt.sign(
    { userId: user._id, name, email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  res.status(StatusCodes.CREATED).json({
    code: 0,
    msg: 'Successfully register user',
    data: {
      token,
      id: user._id,
      name,
      email,
    },
  });
};

const login = async (req, res) => {
  res.send('Login user');
};

module.exports = {
  register,
  login,
};
