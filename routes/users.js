const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

router
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', createUser);

module.exports = router;