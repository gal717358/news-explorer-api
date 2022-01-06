const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const { validateUser } = require('../middleware/validations');

const usersRouter = require('./articles');
const articlesRouter = require('./articles');

router.use('/', auth, usersRouter);
router.use('/', auth, articlesRouter);
router.use('/signin', validateUser, login);
router.use('/signup', validateUser, createUser);

module.exports = router;
