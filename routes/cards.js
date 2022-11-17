const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router
  .get('/', getCards)
  .post('/', createCard)
  .delete('/:cardId', deleteCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId/likes', dislikeCard);

module.exports = router;