const jwt = require("jsonwebtoken");
require("dotenv").config();

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(token, process.env.USER_PASSWORD);

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
    userMiddleware
}