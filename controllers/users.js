const User = require('../models/user');

const {
  CODE_OK, CODE_CREATED, CODE_BAD_REQUEST, CODE_NOT_FOUND,
  CODE_INTERNAL_SERVER_ERRORE, TEXT_ERRORE_NO_USER, TEXT_ERRORE_DATA,
} = require('../utils/constants');

const { createdMessageError } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => {
      res
        .status(CODE_OK)
        .send(users);
    })
    .catch((err) => {
      res
        .status(CODE_INTERNAL_SERVER_ERRORE)
        .send(createdMessageError(err));
    });
};
module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error(TEXT_ERRORE_NO_USER);
      }
      res
        .status(CODE_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(CODE_BAD_REQUEST)
          .send({ message: TEXT_ERRORE_DATA });
      }
      if (err.message === TEXT_ERRORE_NO_USER) {
        res
          .status(CODE_NOT_FOUND)
          .send(createdMessageError(err));
      } else {
        res
          .status(CODE_INTERNAL_SERVER_ERRORE)
          .send(createdMessageError(err));
      }
    });
};
module.exports.updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new Error(TEXT_ERRORE_NO_USER);
      }
      res
        .status(CODE_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(CODE_BAD_REQUEST)
          .send(createdMessageError(err));
      } else if (err.message === TEXT_ERRORE_NO_USER) {
        res
          .status(CODE_NOT_FOUND)
          .send(createdMessageError(err));
      } else {
        res
          .status(CODE_INTERNAL_SERVER_ERRORE)
          .send(createdMessageError(err));
      }
    });
};
module.exports.updateUserAvatar = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new Error(TEXT_ERRORE_NO_USER);
      }
      res
        .status(CODE_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(CODE_BAD_REQUEST)
          .send(createdMessageError(err));
      } else if (err.message === TEXT_ERRORE_NO_USER) {
        res
          .status(CODE_NOT_FOUND)
          .send(createdMessageError(err));
      } else {
        res
          .status(CODE_INTERNAL_SERVER_ERRORE)
          .send(createdMessageError(err));
      }
    });
};
module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res
        .status(CODE_CREATED)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(CODE_BAD_REQUEST)
          .send(createdMessageError(err));
      } else {
        res
          .status(CODE_INTERNAL_SERVER_ERRORE)
          .send(createdMessageError(err));
      }
    });
};
