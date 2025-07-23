import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from "react-router-dom"

function HeroSection() {
  const { blogs } = useAuth();
  console.log(blogs);
  return (
    <>
      <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-10 gap-6'>
        {
          blogs && blogs.length > 0 ? (
            blogs.slice(0, 4).map((blog) => (
              <Link to={`/blog/${blog._id}`} key={blog._id} className='bg-white m-3 rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <div className='group relative'>
                  <img src={blog.blogImg} alt={blog.title} className='w-full h-56 object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300 '></div>
                  <h1 className='absolute bottom-4 left-4 text-black text-lg font-bold mx-2 group-hover:text-gray-700 transition-colors duration-300'>{blog.title}</h1>
                </div>
                <div className='p-6 flex items-center'>
                  <img src={blog.adminPhoto} alt={blog.adminName} className='w-12 h-12 rounded-full border-2 border-yellow-400' />
                  <div className='ml-4'>
                    <p className='text-lg font-semibold text-gray-700'>{blog.adminName}</p>
                    <p className='text-xs text-gray-400'>New</p>
                  </div>

                </div>
              </Link>

            ))
          ) : (
            <div className='text-center font-bold text-2xl'>Loading... </div>
          )
        }
      </div>
    </>
  )
}

export default HeroSection