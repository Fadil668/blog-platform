import React from 'react';
import { useAuth } from "../context/AuthProvider";

function MyProfile() {

  const { profile } = useAuth();

  return (
    <>
      <div className='container mx-auto p-4 m-3'>
        <div key={profile._id} className=' rounded-full  p-4 flex flex-col items-center'>
          <img
            src={profile.photo}
            alt={profile.name}
            className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-gray-300'
          />
          <div className="px-6 py-8 mt-2">
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">
              {profile.email}
            </p>
            <p className="text-center text-gray-600 mt-2">
              {profile.phone}
            </p>
            <p className="text-center text-gray-600 mt-2">
              {profile.role}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile