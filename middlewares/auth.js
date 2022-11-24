const jwt = require('jsonwebtoken');
const { TEXT_ERRORE_AUTH_REQUIRED } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const token = req.cookies.jwt;
  if (!token) {
    throw (new AuthError(TEXT_ERRORE_AUTH_REQUIRED));
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '637692aad0a0090428bc3fd0',
    );
  } catch (err) {
    next(new AuthError(TEXT_ERRORE_AUTH_REQUIRED));
  }
  req.user = payload;
  next();
};
