class validationError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new validationError(400, msg);
    }
    static unnauthorized(msg) {
        return new validationError(401, msg)
    }

    static notAcceptable(msg) {
        return new validationError(406, msg);
    }

    static conflict(msg) {
        return new validationError(409, msg);
    }

    static internal(msg) {
        return new validationError(500, msg);
    }
}

module.exports = validationError;