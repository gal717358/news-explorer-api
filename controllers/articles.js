const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const handleArticleErrors = (err) => {
  const errors = { name: '', link: '' };
  if (err.name === 'ValidationError') {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.getAllArticles = ('/articles',
(req, res, next) => {
  Article.find(req.params.id)
    .then((article) => res.status(200).send({ data: article }))
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
      res.status(201).send(article);
    })
    .catch((err) => {
      const errors = handleArticleErrors(err);
      if (errors) {
        throw new BadRequestError({ errors });
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
        throw new NotFoundError('Article not found in the database');
      }
      if (article.owner.toString() === req.user._id.toString()) {
        Article.deleteOne(article).then(() => res.send({ data: article }));
      } else {
        throw new ForbiddenError('You are not the owner of this article');
      }
    })
    .catch(next);
};
