import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) =>{
    try{
        const {name, email, password, phone, role, photo} = req.body;
        if (!name || !email || !password || !phone || !role){
            return res.status(400).json({message: "Enter the required fields"});
        }

        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User already exists with the given email"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser  = await User.create({
            name, email, password: hashedPassword, phone, role, photo
        });

        const token = jwt.sign({email: email, _id: newUser._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true, secure: true, sameSite: "strict"
        });

        return res.status(200).json({user: {email: newUser.email, _id: newUser._id, role: newUser.role, phone: newUser.phone, photo: newUser.photo}, token: token, message: "User Registered successfully"});

    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Error in registering user"});
    }
}

export const loginUser = async(req, res)=>{
    try{
        const {role, email, password} = req.body;
        if (!role || !email || !password){
            return res.status(400).json({message: "Enter the required fields"});
        }

        const user = await User.findOne({email}).select("+password");
        if (!user){
            return res.status(400).json({message: "User is not registered"});
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect){
            return res.status(400).json({message: "Incorrect User Credentials"});
        }

        if (user.role !== role){
            return res.status(400).json({message: `Given role: ${role} not found`});
        }

        const token = jwt.sign({email: email, _id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true, secure: true, sameSite: "strict"
        });

        return res.status(200).json({user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, token: token, message: "User Logged in successfully"});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error in logging the user"});
    }
}

export const logoutUser = (req, res)=>{
    try{
        res.clearCookie("token", {httpOnly: true});
        return res.status(200).json({message: "User logged out successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error in logging out the user"});
    }
}

export const getMyProfile = (req, res)=>{
    try{
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        return res.status(200).json({user: user, message: "User retrived"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error in retrieving the user profile"});
    }
}

export const getAllAdmins = async(req, res)=>{
    try{
        const allAdmins = await User.find({role: "admin"});
        
        if (!allAdmins){
            return res.status(400).json({message: "No admins"});
        }

        return res.status(200).json({admins: allAdmins, message: "Admins retrived"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error in retrieving the admins"});
    }
}