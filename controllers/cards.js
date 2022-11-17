const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch((err) => console.error(err));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => console.error(err));
};
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch((err) => console.error(err));
};
module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res
        .status(200)
        .send(card);
    })
    .catch((err) => console.error(err));
};
module.exports.dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res
        .status(200)
        .send(card);
    })
    .catch((err) => console.error(err));
};
