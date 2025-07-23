import express from "express";
const blogRouter = express.Router();
import { createBlog, deleteBlog, getAllBlogs, getBlog, getUsersBlogs, updateBlog } from "../controllers/blogController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authUser.js";

blogRouter.post("/create", authenticateUser, authorizeAdmin, createBlog);
blogRouter.delete("/delete/:id", authenticateUser, authorizeAdmin, deleteBlog);
blogRouter.get("/all-blogs", getAllBlogs);
blogRouter.get("/single-blog/:id", authenticateUser, getBlog);
blogRouter.get("/my-blogs", authenticateUser, getUsersBlogs);
blogRouter.put("/update/:id", authenticateUser, authorizeAdmin, updateBlog);

export default blogRouter;