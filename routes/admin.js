const { Router } = require("express");
const z  = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AdminModel } = require("../db");
const { auth,JWT_SECRET } = require("../auth");

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
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
    
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

    const email = req.body.email;
    const password = req.body.password;

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
        },JWT_SECRET)
        res.json({
            token: token
        })
    }

})

adminRouter.get("/purchases", auth, function(req, res) {
    res.json({
        message: "admin purchases page"
    })
})

module.exports = {
    adminRouter: adminRouter
}