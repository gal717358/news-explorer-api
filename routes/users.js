const usersRouter = require('express').Router();
const userController = require('../controllers/users');

usersRouter.get('/users/me', userController.getCurrentUser);

module.exports = usersRouter;
