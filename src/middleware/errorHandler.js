const ErrorResponse = require("../helpers/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { 
        ...err,
        message: err.message || 'Error Server',
        statusCode: err.statusCode || 500
    };

    // Mongoose bad ObjectId
    if(err.name === 'CastError') {
        const message = `Article not found with objectId: ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if(err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object
            .values(err.errors)
            .map(error => ({ type: error.path, message: error.message }))
            .reduce((errors, error) => {
                return  { ...errors, [error.type]: error.message }
            }, {});
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode).json({ 
        success: false,
        error: error.message
    });
}

module.exports = errorHandler;
