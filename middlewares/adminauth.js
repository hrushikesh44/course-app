const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "ahdufihvi";

function auth(req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_ADMIN_PASSWORD);

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
    JWT_ADMIN_PASSWORD
}