module.exports.codOk = 200;

module.exports.codCreated = 201;

module.exports.codBadRequest = 400;

module.exports.codForbidden = 404;

module.exports.codInternalServerError = 500;

module.exports.createdMessageError = (err) => ({ message: `${err.name}: ${err.message}` });

module.exports.textErrorNoUser = 'Такого пользователя нет';
