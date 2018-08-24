const getStatusCode = (code) => code || 500;

const handler = function(err, req, res, next) {
    res.status(getStatusCode(err.httpStatusCode)).json({
        "error" : err.message
    });
};

module.exports = handler;