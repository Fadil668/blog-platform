import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";

function Sidebar({ component, setComponent }) {

    const navigate = useNavigate();

    const { profile, setIsAuthenticated } = useAuth();
    console.log(profile);

    const [show, setShow] = useState(false);

    const handleComponents = (e, value) => {
        e.preventDefault();
        setComponent(value);
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/");
    }

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
        <div className='sm:hidden fixed top-4 left-4 z-50' onClick={()=>setShow(!show)}>
            <RxHamburgerMenu className='text-2xl'/>
        </div>
            <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='sm:hidden absolute top-4 right-4 text-xl cursor-pointer' onClick={()=>setShow(!show)}><FaArrowLeft className='text-2xl'/></div>
                <div className='text-center'>
                    <img className="w-24 h-24 rounded-full mx-auto mb-4" src={profile.photo} alt={profile.name} />
                    <p className='text-lg font-semibold '>{profile.name}</p>
                </div>
                <ul className='space-y-4 mx-4'>
                    <button onClick={(e) => handleComponents(e, "My Blogs")} className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-800 transition duration-300'>MY BLOGS</button>
                    <button onClick={(e) => handleComponents(e, "Create Blog")} className='w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-800 transition duration-300'>CREATE BLOG</button>
                    <button onClick={(e) => handleComponents(e, "My Profile")} className='w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-800 transition duration-300'>MY PROFILE</button>
                    <button onClick={goToHome} className='w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-800 transition duration-300'>HOME</button>
                    <button onClick={handleLogout} className='w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-800 transition duration-300'>LOGOUT</button>
                </ul>
            </div>
        </>
    )
}

export default Sidebar