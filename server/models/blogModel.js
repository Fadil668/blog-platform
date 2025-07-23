import mongoose  from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogImg: {
        type: String,
        default: "https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg"
    },
    category: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
        minLength: [200, "Should contain atleast 200 characters"]
    },
    adminName: {
        type: String,
        required: true
    },
    adminPhoto: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

