import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
}catch(error){
    console.log(error);
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server connected`);
});