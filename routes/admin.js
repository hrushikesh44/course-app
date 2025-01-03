const { Router } = require("express");
const { adminModel } = require("../db");

const adminRouter = Router();

adminRouter.post("/signup", function(req, res) {

})

adminRouter.post("/signin", function(req, res) {
    
})

adminRouter.get("/purchases", function(req, res) {
    
})

module.exports = {
    adminRouter: adminRouter
}