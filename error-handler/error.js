const ErrorResponse = require('../utils/error-response');
const ExceptionLog = require('../model/exceptionLog')
const errorHandler = (err, req, res, next) => {
    let error = {
        ...err
    };

    error.message = err.message;

    // Log to console for dev
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'TypeError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // save Log to dataBase for prod
    ExceptionLog.create({
        message: err.message,
        time: new Date(),
        stack: err.stack,
        url: req.url,
        user: req?.user?._id || "Anonymous",
        statusCode: err.statusCode
    }).then(x => {
        console.log("error logged success", x)
    });

    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        code: 500
    });
};

module.exports = errorHandler;