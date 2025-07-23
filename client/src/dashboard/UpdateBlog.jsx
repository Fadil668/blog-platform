import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";

function UpdateBlog() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [blogImg, setBlogImg] = useState("");

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/blog/single-blog/${id}`, { withCredentials: true });
      console.log(response);
      setTitle(response.data.blog.title);
      setAbout(response.data.blog.about);
      setCategory(response.data.blog.category);
      setBlogImg(response.data.blog.blogImg);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  const handleUpdateBlogData = async (e) => {
    e.preventDefault();
    try {
      const photoToSend = blogImg === "" ? "https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg" : blogImg;
      const response = await axios.put(`http://localhost:3000/api/blog/update/${id}`, { title, about, category, blogImg: photoToSend },
        { withCredentials: true }
      );
      console.log(response);
      toast.success(response.data.message || "Blog updated Successfully");
      setTitle("");
      setAbout("");
      setBlogImg("");
      setCategory("");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to update blog");
    }
  }

  return (
    <>
      <div className='min-h-screen flex justify-center items-center bg-gray-100 mx-auto'>
        <div className='w-full max-w-md bg-blue-200 shadow-md rounded p-8'>
          <form onSubmit={handleUpdateBlogData}>
            <div className='font-semibold text-xl text-center'>
              Blog<span className='text-blue-600 '>Platform</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Update Blog</h1>
            <div className='mb-4'>
              <input type="text" value={title} placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Category' className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <textarea placeholder='About Blog...(aleast 200 characters)' value={about} onChange={(e) => setAbout(e.target.value)} rows="6" className="w-full px-4 py-2 border rounded-md"></textarea>
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <div className=' w-20 h-25 mr-4'>
                <img src={blogImg || "https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg"} alt="blog" className='rounded-full' />
              </div>
              <input type="text" value={blogImg} onChange={(e) => setBlogImg(e.target.value)} placeholder='Paste Blog Image URL' className='w-full p-2 border rounded-md' />
            </div>
            <button type="submit" className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>UPDATE</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateBlog