const handler = function(msg, code) {
    const error = new Error(msg);
    if (!code) {
        code = 500;
    }
    error.httpStatusCode = code;

    return error;
};

module.exports = handler;