const jwt = require("jsonwebtoken");
var dotenv = require("dotenv");

dotenv.config()
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

function auth(req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_USER_PASSWORD);

    if(response){
        req.userId = response.id;
        next();
    }else{
        res.status(403).json({
            message: "Invalid token, Login again"
        })
    }
}

module.exports = {
    auth,
    JWT_USER_PASSWORD
}