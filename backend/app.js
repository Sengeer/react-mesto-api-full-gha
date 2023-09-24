const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const {
  PORT = 3000,
  URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;
const app = express();

mongoose.connect(URL, {
  useNewUrlParser: true,
});
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Некорректный путь' });
});

app.listen(PORT);
