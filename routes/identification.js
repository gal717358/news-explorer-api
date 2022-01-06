const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/identification');
const { validateUser } = require('../middleware/validations');

authRouter.post('/signin', validateUser, login);
authRouter.post('/signup', validateUser, createUser);

module.exports = authRouter;
