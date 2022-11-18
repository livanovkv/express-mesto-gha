const Card = require('../models/card');

const {
  CODE_OK, CODE_CREATED, CODE_BAD_REQUEST, CODE_NOT_FOUND,
  CODE_INTERNAL_SERVER_ERRORE, TEXT_ERRORE_NO_CARD, TEXT_ERRORE_DATA,
} = require('../utils/constants');

const { createdMessageError } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => {
      res
        .status(CODE_OK)
        .send(cards);
    })
    .catch((err) => {
      res
        .status(CODE_INTERNAL_SERVER_ERRORE)
        .send(createdMessageError(err));
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res
        .status(CODE_CREATED)
        .send(card);
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
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new Error(TEXT_ERRORE_NO_CARD);
      }
      res
        .status(CODE_OK)
        .send({ message: 'Пост удалён', card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(CODE_BAD_REQUEST)
          .send({ message: TEXT_ERRORE_DATA });
      } else if (err.message === TEXT_ERRORE_NO_CARD) {
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
module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new Error(TEXT_ERRORE_NO_CARD);
      }
      res
        .status(CODE_OK)
        .send(card);
    })
    .catch((err) => {
      if (err.message === TEXT_ERRORE_NO_CARD) {
        res
          .status(CODE_NOT_FOUND)
          .send(createdMessageError(err));
      } else {
        res
          .status(CODE_BAD_REQUEST)
          .send(createdMessageError(err));
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new Error(TEXT_ERRORE_NO_CARD);
      }
      res
        .status(CODE_OK)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(CODE_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else if (err.message === TEXT_ERRORE_NO_CARD) {
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
