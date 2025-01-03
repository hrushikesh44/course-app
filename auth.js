const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdhuufuishduihiu";

function auth(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData){
        next();
    } else {
        res.status(403).json({
            message : "Access Denied, Please login again"
        })
    }
}