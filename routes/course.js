const { Router } = require("express");
const { CourseModel } = require("../db");

const courseRouter = Router();

courseRouter.get("/preview", function(req, res) {
    
})

courseRouter.get("/purchase", function(req, res) {
    
})

module.exports = {
    courseRouter: courseRouter
}