import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {useAuth} from "../context/AuthProvider";

function Register() {

  const navigate = useNavigate();

  const {isAuthenticated, setIsAuthenticated, setProfile} = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const photoToSend = photo === "" ? "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg"
        : photo;
      const response = await axios.post("http://localhost:3000/api/user/register", { name, email, password, role, phone, photo: photoToSend },
        { withCredentials: true} );
      console.log(response);
      toast.success(response.data.message);
      setIsAuthenticated(true);
      setProfile(response.data.user);
      console.log(response.data.user);
      setEmail("");
      setName("");
      setPassword("");
      setPhone("");
      setPhoto("");
      setRole("");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <div className='min-h-screen flex justify-center items-center bg-gray-100'>
        <div className='w-full max-w-md bg-blue-200 shadow-md rounded p-8'>
          <form onSubmit={handleRegisterUser}>
            <div className='font-semibold text-xl text-center'>
              Blog<span className='text-blue-600 '>Platform</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Register</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mb-4'>
              <input type="text" value={name} placeholder='Enter Full Name' onChange={(e) => setName(e.target.value)} className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Address' className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4'>
              <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Contact Number' className='w-full p-2 border rounded-md' />
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <div className=' w-20 h-20 mr-4'>
                <img src={photo || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg"} alt="profile" className='rounded-full' />
              </div>
              <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder='Paste Profile Image URL' className='w-full p-2 border rounded-md' />
            </div>
            <p className='text-center mb-4'>Already Registered? <Link to="/login" className='text-blue-600'>Login Now</Link></p>
            <button type="submit" className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>REGISTER</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register