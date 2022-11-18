module.exports.createdMessageError = (err) => ({ message: `${err.name}: ${err.message}` });
