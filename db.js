const  mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema ({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true},
    password: String
})

const Admin = new Schema ({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true},
    password: String
})

const Courses = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const Purchases = new Schema({
    courseId: ObjectId,
    creatorId: ObjectId
})

const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("courses", Courses);
const PurchaseModel = mongoose.model("purchases", Purchases);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}