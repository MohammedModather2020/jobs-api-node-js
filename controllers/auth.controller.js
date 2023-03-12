const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const {
  BadRequestError,
  UnauthenticatedError,
} = require('../errors/index.error');
const { generateJwtToken } = require('../middleware/jwt.middleware');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) throw new BadRequestError('name is require');

  if (!email) throw new BadRequestError('email is require');

  if (!password) throw new BadRequestError('password is require');

  const user = await User.create({ name, email, password });

  const token = generateJwtToken(user._id, name);

  res.status(StatusCodes.CREATED).json({
    code: 1,
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
  const { email, password } = req.body;
  if (!email) throw new BadRequestError('email is require');

  if (!password) throw new BadRequestError('password is require');

  const isEmailExist = await User.findOne({ email });

  if (!isEmailExist)
    throw new UnauthenticatedError('Invalid email or password');

  const isPasswordCorrect = await isEmailExist.comparePassword(password);

  if (isPasswordCorrect) {
    const token = generateJwtToken(isEmailExist._id, isEmailExist.name);

    res.status(StatusCodes.OK).json({
      code: 1,
      msg: 'Successfully login user',
      data: {
        token,
        id: isEmailExist._id,
        name: isEmailExist.name,
        email,
      },
    });
  } else {
    throw new UnauthenticatedError('Invalid email or password');
  }
};

module.exports = {
  register,
  login,
};
