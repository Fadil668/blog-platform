import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";


function MyBlogs() {

  const [myBlogs, setMyBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blog/my-blogs", { withCredentials: true });
      console.log(response.data.blog);
      setMyBlogs(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async(e, id) =>{
    e.preventDefault();
    try{
      const response = await axios.delete(`http://localhost:3000/api/blog/delete/${id}`, { withCredentials: true });
      toast.success(response.data.message || "Blog deleted successfully");
      setMyBlogs((blogs)=>blogs.filter((blog)=>blog._id !== id));
    }catch(error){
      console.log(error);
      toast.error(error.message || "Unable to delete blog");
    }
  }

  return (
    <>
      <div className='ml-64 container px-12 mx-12 my-12'>
        <div className="mx-3 grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {
            myBlogs && myBlogs.length > 0 ? (
              myBlogs.map((blog) => (
                <div key={blog._id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
                  <img src={blog.blogImg} alt={blog.title} className='w-full h-48 object-cover' />
                  <div className='p-4'>
                    <span className="text-sm text-gray-600">{blog.category}</span>
                    <h4 className="text-xl font-semibold my-2">{blog.title}</h4>
                    <div className="flex justify-between mt-4">
                    <Link to={`/blog/update/${blog._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline">
                      UPDATE </Link>
                    <button onClick={(e) => handleDelete(e, blog._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline">
                      DELETE </button>
                  </div>
                </div>

                </div>

              ))
            ) : (
              <div className='text-center text-gray-500 text-2xl'>No blogs have been posted.</div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default MyBlogs