import express from "express";
const userRouter = express.Router();
import { registerUser, loginUser, logoutUser, getMyProfile, getAllAdmins } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authUser.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", authenticateUser, logoutUser);
userRouter.get("/profile", authenticateUser, getMyProfile);
userRouter.get("/admins", getAllAdmins);

export default userRouter;