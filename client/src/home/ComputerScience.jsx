import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from "react-router-dom"

function ComputerScience() {
  const { blogs } = useAuth();
  const computerSciBlogs = blogs?.filter((blog) => blog.category === "Computer Science");

  return (
    <>
      <div className='container mx-auto p-4 m-3'>
        <h1 className='text-2xl font-semibold mb-2 0'>Computer Science</h1>
        <p className='text-sm mb-4 ml-2 text-gray-600'>Empowering minds through the evolving world of computer science and technology.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {
            computerSciBlogs && computerSciBlogs.length > 0 ? (
              computerSciBlogs.slice(0, 6).map((blog) => (
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
      </div>
    </>
  )
}

export default ComputerScience