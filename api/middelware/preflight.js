module.exports = function (req, res, next) {
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};