const RestError = require("../utils/restError");
module.exports = (err, req, res, next) => {
    if(err instanceof RestError) {
        return res.status(err.statusCode).send(`Error ${err.statusCode} - ${err.message}`);
    }
    const statusCode = err.statusCode || 500;
    const message = `Error ${statusCode}, message: server error`;
    res.status(statusCode).send(message);
}