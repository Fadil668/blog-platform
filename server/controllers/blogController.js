import Blog from "../models/blogModel.js";

export const createBlog = async(req, res)=>{
    try{
        const {title, about, category, blogImg} = req.body;

        if (!title || !about || !category){
            return res.status(400).json({message: "Enter the required fields"});
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo;
        const createdBy = req?.user?._id;

        const newBlog = await Blog.create({
            title, category, about, blogImg, adminName, adminPhoto, createdBy
        });

        return res.status(200).json({blog: newBlog, message: "Blog created sucessfully"});

    }catch(error){
        console.log(error);
        return res.status(400).json({message: "Error in creating the blog"});
    }
}

export const deleteBlog = async(req, res)=>{
    try{
        const blogId = req.params.id;
        const deletedBlog = await Blog.findById(blogId);
        if (!deletedBlog){
            return res.status(400).json({message: "Blog not found"});
        }

        await deletedBlog.deleteOne();
        return res.status(200).json({message: "Blog deleted successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error in deleting the blog"});
    }
}

export const getAllBlogs = async(req, res)=>{
    try{
        const allBlogs = await Blog.find({});
        if (!allBlogs){
            return res.status(400).json({message: "No blogs found"});
        }

        return res.status(200).json({blogs: allBlogs, message: "All blogs retrieved"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Error in retreiving all the blogs"});
    }
}

export const getBlog = async(req, res)=>{
    try{
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog){
            return res.status(400).json({message: "Blog not found"});
        }

        return res.status(200).json({blog: blog, message: "Blog retrieved"});
    }catch(error){
       console.log(error);
       return res.status(500).json({message: "Error in retreiving the blog"}); 
    }
}

export const getUsersBlogs = async(req, res)=>{
    try{
        const userId = req.user._id;
        const usersBlogs = await Blog.find({createdBy: userId});

        if (!usersBlogs){
            return res.status(400).json({message: "User has no blogs"});
        }

        return res.status(200).json({blog: usersBlogs, message: "Users blogs retrieved"});
    }catch(error){
        console.log(error);
       return res.status(500).json({message: "Error in retreiving the users blogs"}); 
    }
}

export const updateBlog = async(req, res)=>{
    try{
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog){
            return res.status(400).json({message: "Blog does not exist"});
        }

        const updatingBlog = await Blog.findByIdAndUpdate(blogId, req.body, {new: true});

        return res.status(201).json({blog: updatingBlog, message: "Blog has been updated"});
    }catch(error){
        console.log(error);
       return res.status(500).json({message: "Error in updating the blog"}); 
    }
}