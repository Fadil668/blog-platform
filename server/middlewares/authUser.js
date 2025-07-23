import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async(req, res, next)=>{
    try{
        const token = req.cookies.token;
        if (!token){
            return res.status(400).json({message: "Unauthenticated User"});
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser._id);
        req.user = user;
        next();

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Unauthenticated User"});
    }
}

export const authorizeAdmin = async(req, res, next)=>{
    try{
        if (req.user.role !== "admin"){
            return res.status(400).json({message: "Unauthorized User"});
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Unauthorized User"});
    }
}