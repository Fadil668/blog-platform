import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import About from "./pages/about";
import Contact from "./pages/Contact";
import Creator from "./pages/Creator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from 'react-hot-toast';
import UpdateBlog from "./dashboard/UpdateBlog";
import DetailedBlog from "./pages/DetailedBlog";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  const location = useLocation();
  const hideNavbarFooter = ["/login", "/register", "/dashboard"].includes(location.pathname);

  const { blogs, isAuthenticated } = useAuth();
  console.log(blogs);

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />

        {!hideNavbarFooter && <Navbar />}

        <Routes>
          <Route exact path="/" element={isAuthenticated === true ? <Home /> : <Navigate to={"/login"} />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/creators" element={<Creator />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
          <Route exact path="/blog/:id" element={<DetailedBlog />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>

        {!hideNavbarFooter && <Footer />}

      </div>


    </>
  )
}

export default App
