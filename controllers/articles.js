const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const { statusCode, errorText } = require('../utils/constants');

module.exports.getAllArticles = ('/articles',
(req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.status(statusCode.ok).send({ data: article }))
    .catch(next);
});

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      res.status(statusCode.success).send(article);
    })
    .catch((err) => {
      if (err) {
        throw new BadRequestError(errorText.articleBadRequest);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errorText.articleNotFound);
      }
      if (article.owner.toString() === req.user._id.toString()) {
        Article.deleteOne(article).then(() => res.status(statusCode.ok).send({ data: article }));
      } else {
        throw new ForbiddenError(errorText.deleteArticle);
      }
    })
    .catch(next);
};
