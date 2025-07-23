import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

function DetailedBlog() {

    const {id} = useParams();

    const [blog, setBlog] = useState({});

    const fetchBlogData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/blog/single-blog/${id}`, { withCredentials: true });
      console.log(response.data.blog);
      setBlog(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchBlogData();
  },[id]);

  return (
    <>
    <div className='p-8 mx-3'>
      <div>
        {blog && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blog?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blog?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blog?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blog?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {blog?.blogImg && (
                <img
                  src={blog?.blogImg}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{blog.about}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  )
}

export default DetailedBlog