const articlesRouter = require('express').Router();
const articleController = require('../controllers/articles');
const { validateArticle } = require('../middleware/validations');

articlesRouter.get('/articles', articleController.getAllArticles);
articlesRouter.post('/articles', validateArticle, articleController.createArticle);
articlesRouter.delete('/articles/:articleId', articleController.deleteArticleById);

module.exports = articlesRouter;
