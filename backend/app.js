const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
require('dotenv').config();
const NotFoundError = require('./errors/not-found-err');

const {
  PORT = 3001,
  URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;
const app = express();

mongoose.connect(URL, {
  useNewUrlParser: true,
});
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://mesto.sengeer.nomoredomainsrocks.ru',
    'https://mesto.sengeer.nomoredomainsrocks.ru',
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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

app.all('*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});

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

app.listen(PORT);
