import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from "react-router-dom"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();
  console.log(blogs);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <div className='container mx-auto p-4 m-3'>
        <h1 className='text-2xl font-semibold mb-4'>Trending</h1>
        <Carousel responsive={responsive}>

          {
            blogs && blogs.length > 0 ? (
              blogs.slice(0, 6).map((blog) => (
                <Link to={`/blog/${blog._id}`} key={blog._id} className='bg-white mx-3 rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                  <div className='group relative mx-1'>
                    <img src={blog.blogImg} alt={blog.title} className='w-full h-56 object-cover' />
                    <div className='absolute inset-0  opacity-75 group-hover:opacity-100 transition-transform duration-300 '></div>
                    <h1 className='absolute bottom-4 left-4 text-black text-lg font-bold mx-2 group-hover:text-gray-700 transition-colors duration-300'>{blog.title}</h1>
                  </div>
                  <div className='p-6 flex items-center bg-white mx-1'>
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
        </Carousel>
      </div>
    </>
  )
}

export default Trending