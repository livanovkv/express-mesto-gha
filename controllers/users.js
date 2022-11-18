const User = require('../models/user');

const {
  codOk, codCreated, codBadRequest, codNotFound,
  codInternalServerError, textErrorNoUser,
} = require('../utils/constants');

const { createdMessageError } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => {
      res
        .status(codOk)
        .send(users);
    })
    .catch((err) => {
      res
        .status(codInternalServerError)
        .send(createdMessageError(err));
    });
};
module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error(textErrorNoUser);
      }
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.message === textErrorNoUser) {
        res
          .status(codNotFound)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
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
        throw new Error(textErrorNoUser);
      }
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      } else if (err.message === textErrorNoUser) {
        res
          .status(codNotFound)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
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
        throw new Error(textErrorNoUser);
      }
      res
        .status(codOk)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      } else if (err.message === textErrorNoUser) {
        res
          .status(codNotFound)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageError(err));
      }
    });
};
module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res
        .status(codCreated)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(codBadRequest)
          .send(createdMessageError(err));
      } else {
        res
          .status(codInternalServerError)
          .send(createdMessageError(err));
      }
    });
};
