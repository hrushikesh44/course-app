const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema ({
    username: username,
    email: email,
    password: password,
    id: ObjectId
})

const Admin = new Schema ({
    username: username,
    email: email,
    password: passsword,
    id: ObjectId
})

const Courses = new Schema({
    courseId: ObjectId,
    coursename: coursename,
    price: price
})

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("courses", Courses);