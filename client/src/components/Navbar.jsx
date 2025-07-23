import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import {toast} from "react-hot-toast";

function Navbar() {

  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log(profile);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true
      });
      setIsAuthenticated(false);
      toast.success(response.data.message || "User logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to logout user");
    }
  }

  return (
    <>
      <nav className='shadow-lg px-5 py-3'>
        <div className='flex justify-between items-center container mx-auto'>
          <div className='font-semibold text-xl'>
            Blog<span className='text-blue-600 '>Platform</span>
          </div>
          <div>
            <ul className='flex space-x-8 font-semibold hidden md:flex'>
              <Link to="/" className='hover:text-blue-700'>HOME</Link>
              <Link to="/blogs" className='hover:text-blue-700'>BLOGS</Link>
              <Link to="/creators" className='hover:text-blue-700'>CREATORS</Link>
              <Link to="/about" className='hover:text-blue-700'>ABOUT</Link>
              <Link to="contact" className='hover:text-blue-700'>CONTACT</Link>
            </ul>

            <div className="md:hidden" onClick={() => setShow(!show)}>
              {
                show ? <RxCross1 size={24} /> : <AiOutlineMenu size={24} />
              }
            </div>

          </div>
          <div className='space-x-6 hidden md:flex'>
            {
              isAuthenticated && profile.role === "admin" ? (
                <Link to="/dashboard" className='bg-blue-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 duration-300'>DASHBOARD</Link>
              ) : ("")
            }

            {
              !isAuthenticated ? (
                <Link to="/login" className='bg-red-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 duration-300'>LOGIN</Link>
              ) : (
                <button className='bg-red-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 duration-300' onClick={handleLogout}>LOGOUT</button>
              )
            }
            
          </div>
        </div>
        {/* mobile */}
        {
          show &&
          (
            <div className='bg-white '>
              <ul className='flex flex-col h-screen items-center justify-center space-y-3 md:hidden font-semibold'>
                <Link to="/" onClick={() => setShow(!show)} className='hover:text-blue-700'>HOME</Link>
                <Link to="/blogs" onClick={() => setShow(!show)} className='hover:text-blue-700'>BLOGS</Link>
                <Link to="/creators" onClick={() => setShow(!show)} className='hover:text-blue-700'>CREATORS</Link>
                <Link to="/about" onClick={() => setShow(!show)} className='hover:text-blue-700'>ABOUT</Link>
                <Link to="contact" onClick={() => setShow(!show)} className='hover:text-blue-700'>CONTACT</Link>
              </ul>
            </div>
          )
        }
      </nav>


    </>
  )
}

export default Navbar