const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCurrentUser = ((req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('The user was not found');
      }
    })
    .catch(next);
});
