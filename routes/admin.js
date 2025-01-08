const { Router } = require("express");
const z  = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AdminModel,CourseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");
require("dotenv").config();
const course = require("./course");

const adminRouter = Router();

adminRouter.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        firstName: z.string().min(5).max(20),
        lastName: z.string().min(5).max(20),
        email: z.string(),
        password: z.string().min(3).max(20)
    })

    const parseBody = requiredBody.safeParse(req.body);

    if(!parseBody.success){
        res.json({
            message: "invalid pattern in credentials"
        })
        return
    }

    try{
        const { firstName, lastName, email, password  } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 5);
    
        await AdminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
        res.json({
            message: "You've signed up successfully"
        })
    } catch(e){
        res.json({
            message: " email already exists"
        })
    }

})

adminRouter.post("/signin", async function(req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string().min(3).max(20)
    })

    const parseBody = requiredBody.safeParse(req.body);
    if(!parseBody.success){
        res.json({
            message: "Invalid creds"
        })
        return
    }

    const { email, password} = req.body;
    const response = await AdminModel.findOne({
        email
    })

    if(!response){
        res.json({
            message: "email not found"
        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if(!passwordMatch){
        res.json({
            message: "wrong password"
        })
    } else {
        const token = jwt.sign({
            id: response._id.toString()
        },process.env.ADMIN_PASSWORD)
        res.json({
            token: token
        })
    }

})

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    const newCourse = await CourseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "course created",
        courseId: newCourse._id
    })
    
})

adminRouter.put("/course/update", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl, courseId } = req.body;

    const updateCourse = await CourseModel.updateOne({
        _id: courseId,
        adminId
    }, {
        title,
        description,
        price,
        imageUrl
    })

    if(!updateCourse){
        res.json({
            message: "you do not have access"
        })
    }

    res.json({
        message: "course updated",
        courseId: updateCourse._id
    })

})

adminRouter.get("/courses/bulk", adminMiddleware, async function(req,res) {
    const adminId = req.userId;

    const courses = await CourseModel.find({
        creatorId: adminId
    })

    res.json({
        courses
    })
})

adminRouter.put("/course/delete", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const courseId = req.body.courseId;

    await CourseModel.findOneAndDelete({
        _id: adminId
    }, {
        courseId
    })

    res.json({
        message: "deleted successfully"
    })
})

module.exports = {
    adminRouter: adminRouter
}