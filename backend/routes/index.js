const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const {
  createUser,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', celebrate({
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
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);

router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use(errorLogger);

router.use(errors());

router.all('*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});

module.exports = router;
