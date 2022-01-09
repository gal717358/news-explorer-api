const usersRouter = require('express').Router();
const { getCurrentUser } = require('../controllers/users');
const auth = require('../middleware/auth');

usersRouter.get('/users/me', auth, getCurrentUser);

module.exports = usersRouter;
