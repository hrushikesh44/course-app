const jwt = require("jsonwebtoken");
require("dotenv").config();


function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(token, process.env.ADMIN_PASSWORD);

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
    adminMiddleware
}