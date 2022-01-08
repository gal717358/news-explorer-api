const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/identification');
const { validateSignup, validateSignin } = require('../middleware/validations');

authRouter.post('/signup', validateSignup, createUser);
authRouter.post('/signin', validateSignin, login);

module.exports = authRouter;
