const { NODE_ENV } = process.env;

module.exports.DB_ADDRESS = NODE_ENV === 'production' ? 'mongodb://localhost:27017/news-explorer' : 'mongodb://localhost:27017/news-explorer';
