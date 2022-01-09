const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const AuthenticationError = require('../errors/AuthenticationError');
const { DEV_KEY, statusCode, errorText } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => res.status(statusCode.success).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(errorText.signupError);
      } else {
        throw new ConflictError(errorText.signupError);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
          { expiresIn: '7d' },
        );
        res.status(statusCode.ok).send({ token });
      }
    }).catch((err) => {
      if (err) {
        throw new AuthenticationError(errorText.unauthorized);
      }
    })
    .catch(next);
};
