const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { DEV_KEY, statusCode, errorText } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

dotenv.config();
const handleAuthError = (res) => {
  res
    .status(statusCode.unauthorized)
    .send({ message: errorText.unauthorized });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY);
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
