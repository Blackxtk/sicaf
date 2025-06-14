const { ValidationError } = require("sequelize");

function logErrores (error, req, res, next) {
  console.log('log');
  console.error(error);
  next(error);
}

function errorHandler (error, req, res, next) {
  console.log('hand');
  res.status(500).json({
    message: error.message,
    stack:  error.stack
  });
}

function boomErrorHandler (error, req, res, next) {
  console.log('boom');
  if(error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }else{
  next(error);
  }
}

function ormErrorHandler(error, req, res, next){
  if (error instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors
    });
  }
  next(error)
}

module.exports = { logErrores, errorHandler, boomErrorHandler, ormErrorHandler }
