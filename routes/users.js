const router = require('express').Router();

const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

//* Принимаем запросы
router
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', createUser)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateUserAvatar);

module.exports = router;
