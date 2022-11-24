module.exports.createdMessageErrorControllers = (err) => ({ message: `${err.name}: ${err.message}` });
