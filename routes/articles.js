const articlesRouter = require('express').Router();
const { getAllArticles, createArticle, deleteArticleById } = require('../controllers/articles');
const { validateArticle, validateDelete } = require('../middleware/validations');

const auth = require('../middleware/auth');

articlesRouter.get('/articles', auth, getAllArticles);
articlesRouter.post('/articles', auth, validateArticle, createArticle);
articlesRouter.delete('/articles/:articleId', auth, validateDelete, deleteArticleById);

module.exports = articlesRouter;
