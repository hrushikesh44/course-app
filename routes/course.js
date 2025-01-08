const { Router } = require("express");
const { CourseModel, PurchaseModel } = require("../db");
const { auth } = require("../middlewares/userauth");

const courseRouter = Router();

courseRouter.get("/preview", async function(req, res) {
    
    const courses= await CourseModel.find({});

    res.json({
        courses
    })
})

courseRouter.get("/purchase", auth, async function(req, res) {
    const userId =req.userId;
    const courseId = req.body.courseId;

    await PurchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "you've purchased a course"
    })
})

module.exports = {
    courseRouter: courseRouter
}