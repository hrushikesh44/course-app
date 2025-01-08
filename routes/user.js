const { Router } = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, PurchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        firstName: z.string().min(5).max(20),
        lastName: z.string().min(5).max(20),
        email: z.string(),
        password: z.string()
    })

    const parseBody = requiredBody.safeParse(req.body);

    if(!parseBody.success){
        res.status(300).json({
            message : "invalid credentials",
            error: parseBody.error
        });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        res.json({
            message: "signed up"
        })
    }catch(e){
        res.json({
            message: "email already exists"
        })
    }
})

userRouter.post("/signin", async function(req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string()
    })

    const parseBody = requiredBody.safeParse(req.body);

    if(!parseBody.success){
        res.status(400).json({
            message : "invalid credentials"
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email
    })

    if(!response){
        res.status(403).json({
            message: "email not found"
        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if(passwordMatch){
        const token = jwt.sign({
            id:response._id.toString()
        }, process.env.USER_PASSWORD);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "incorrect password"
        })
    }

})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId; 

    const purchases = await PurchaseModel.findOne({
        userId,
    });

    res.json({
        purchases: purchases
    })
})

module.exports = {
    userRouter: userRouter
}