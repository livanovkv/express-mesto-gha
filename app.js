const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '637692aad0a0090428bc3fd0',
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => {
  res
    .status(404)
    .send({ message: 'Страница не существет' });
});

app.listen(PORT);
