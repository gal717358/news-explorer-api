const { NODE_ENV, SERVER } = process.env;

module.exports.DB_ADDRESS = NODE_ENV === 'production' ? SERVER : 'mongodb://localhost:27017/news-explorer';

module.exports.DEV_KEY = 'my-secret-code';

module.exports.statusCode = {
  ok: 200,
  success: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
};

module.exports.errorText = {
  notFound: 'Requested resource could not be found',
  unauthorized: 'Authorization required',
  serverError: 'The server is not responding',
  deleteArticle: 'You are not the owner of this article',
  articleBadRequest: 'Data validation failed',
  articleNotFound: 'Article is not found in the database',
  signupError: 'Unable to create the user',
  signinError: 'Incorrect email or password',
  usersBadRequest: 'The user was not found',
  userBadRequest: 'The user was not found',
};
