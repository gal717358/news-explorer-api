const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const routerRoutes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { DB_ADDRESS } = require('./utils/constants');
const { limiter } = require('./middleware/limiter');
const { errorHandler } = require('./middleware/errorHandler');
const { statusCode, errorText } = require('./utils/constants');

dotenv.config();

const NotFoundError = require('./errors/NotFoundError');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', routerRoutes);

app.use((req, res, next) => {
  res.status(statusCode.notFound).send({ message: errorText.notFound });
  next();
});

app.get('*', () => {
  throw new NotFoundError(errorText.notFound);
});

app.use(limiter);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
