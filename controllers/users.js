const User = require('../models/user');
const { statusCode, errorText } = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');

module.exports.getCurrentUser = ((req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(statusCode.ok).send({ data: user });
      } else {
        throw new NotFoundError(errorText.userBadRequest);
      }
    })
    .catch(next);
});
