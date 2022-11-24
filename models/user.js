const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const validatorjs = require('validator');

const { TEXT_ERRORE_NO_VALID_EMAIL_PASSWORD } = require('../utils/constants');

const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return /^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/.test(value);
      },
    },
    default: 'https://illustrators.ru/uploads/illustration/image/1207680/20181013_120232.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validatorjs.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(TEXT_ERRORE_NO_VALID_EMAIL_PASSWORD);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(TEXT_ERRORE_NO_VALID_EMAIL_PASSWORD);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
