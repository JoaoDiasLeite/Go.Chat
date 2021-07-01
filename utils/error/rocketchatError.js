class rocketchatError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static badRequest(msg) {
        return new rocketchatError(400, msg);
    }
    static unnauthorized(msg) {
        return new validationError(401, msg)
    }
    static notAcceptable(msg) {
        return new rocketchatError(406, msg);
    }
    static conflict(msg) {
        return new rocketchatError(409, msg);
    }
    static internal(msg) {
        return new rocketchatError(500, msg);
    }
}

module.exports = rocketchatError;