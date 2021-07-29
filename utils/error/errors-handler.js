const validationError = require('./validationError');
const rocketchatError = require('./rocketchatError');

/**
 * Function used to handle the errors
 * 
 * @param {Error} err 
 * @param {Objec} req 
 * @param {Object} res 
 * @param {Function} next 
 * 
 * @returns response and status
 */
function ErrorsHandler(err, req, res, next) {

    if (err instanceof validationError) {
        res.status(err.code).end(err.message);
        return;
    }
    if (err instanceof rocketchatError) {
        res.status(err.code).end(err.message);
        return;
    }


    res.status(500).json('Something went wrong')
}

module.exports = ErrorsHandler;