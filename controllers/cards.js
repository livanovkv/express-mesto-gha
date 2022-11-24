const Card = require('../models/card');
const {
  CODE_CREATED,
  TEXT_ERRORE_VALIDATION,
  TEXT_MESSAGE_DELETE_CARD,
  TEXT_ERRORE_ACCESS,
  TEXT_ERRORE_NO_CARD,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');

const AccessError = require('../errors/AccessError');

const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(CODE_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(TEXT_ERRORE_VALIDATION));
      } else {
        next(err);
      }
    });
};
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new Error(TEXT_ERRORE_NO_CARD);
      } else if (card.owner.toHexString() !== req.user._id) {
        throw new AccessError(TEXT_ERRORE_ACCESS);
      }
      card
        .remove()
        .then(() => {
          res.send({ message: TEXT_MESSAGE_DELETE_CARD, card });
        })
        .catch(next);
    })
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(TEXT_ERRORE_NO_CARD);
      }
      res
        .send(card);
    })
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(TEXT_ERRORE_NO_CARD);
      }
      res
        .send(card);
    })
    .catch(next);
};
