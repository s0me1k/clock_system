module.exports = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    next();
}