const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => {
      res
        .status(200)
        .send(users);
    })
    .catch((err) => console.error(err));
};

module.exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => console.error(err));
};

module.exports.createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => {
      res
        .status(201)
        .send(user);
    })
    .catch((err) => console.error(err));
};