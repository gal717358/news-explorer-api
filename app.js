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
  res.status(404).send({ message: 'Requested resource not found' });
  next();
});

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use(limiter);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
