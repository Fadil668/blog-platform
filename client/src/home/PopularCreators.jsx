import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';

function PopularCreators() {

  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async (e) => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/admins", {
        withCredentials: true
      });
      console.log(response.data.admins);
      setAdmins(response.data.admins);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to retrieve admins");
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <>
      <div className='container mx-auto p-4 m-3'>
        <h1 className='text-2xl font-semibold mb-4'>Popular Creators</h1>
        <div className='rounded-full my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {
            admins && admins.length > 0 ? (
              admins.slice(0, 4).map((admin) => (
                <div key={admin._id} className=' rounded-full  p-4 flex flex-col items-center'>
                  <img
                    src={admin.photo}
                    alt={admin.name}
                    className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-gray-300'
                  />
                  <p className='mt-4 text-lg font-semibold text-gray-800'>{admin.name}</p>
                  <p className='text-xs text-gray-500 capitalize'>{admin.role}</p>
                </div>
              ))
            ) : (
              <div className='text-center font-bold text-2xl'>Loading...</div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default PopularCreators