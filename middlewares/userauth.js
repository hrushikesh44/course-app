const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

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