const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        // console.log("token");
        if (!token) {
            return res
                .status(403)
                .json({ result: "A token is required for authentication" });
        }
        try {
            const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ result: "Invalid Token" });
        }
        // console.log("next");
        return next();
    } catch (err) {
        console.log(err);
    }
};

module.exports = verifyToken;
