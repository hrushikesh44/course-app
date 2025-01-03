const express = require("express");
const mongoose = require("mongoose");
var dotenv = require("dotenv");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());
dotenv.config();
var url = process.env.MONGOLAB_URI;

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);


async function main() {
    await mongoose.connect(url);
    app.listen(3000);
}

main();
