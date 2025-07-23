import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail,"Please Enter a Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    }, 
    password: {
        type: String,
        required: true,
        select: false
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;