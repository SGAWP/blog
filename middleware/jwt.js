const jwt = require("jsonwebtoken");
const config = require("../config/env");

module.exports = function (req, res, next) {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(403).send({ auth: false, message: "Token not provided." });
    }

    jwt.verify(token, config.jwt_key, function (err, decoded) {
        if (err)
            return res.status(401).send({ auth: false, message: "Failed to authenticate token." });
        req.decoded = decoded;
        next();
    });
};