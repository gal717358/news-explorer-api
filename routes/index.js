const router = require('express').Router();

const identification = require('./identification');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

router.use('/', identification);
router.use('/', usersRouter);
router.use('/', articlesRouter);

module.exports = router;
