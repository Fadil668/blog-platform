import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar';
import MyProfile from "../dashboard/MyProfile";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlogs from "../dashboard/MyBlogs";
import {Navigate} from "react-router-dom";

function Dashboard() {

  const {profile, isAuthenticated} = useAuth();
  console.log(profile);
  console.log(isAuthenticated);

  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated){
    return (
      <Navigate to="/" />
    )
  }
  return (
    <>
    <div>
      <div><Sidebar component={component} setComponent={setComponent} />
      {
        component === "My Profile" ? ( <MyProfile /> ) : component === "Create Blog" ? (<CreateBlog />) : 
        component === "Update Blog" ? (<UpdateBlog />) : (<MyBlogs />)
      }
      </div>
    </div>
    </>
  )
}

export default Dashboard