import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
    <footer className='border p-10'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      <div className='text-center md:text-start'>
        <h2 className='text-lg font-semibold mb-4'>Products</h2>
        <ul className='space-y-2'>
          <li><a href="#" className='text-gray-400 hover:text-white'>Flutter</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>React</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>Android</a></li>
             <li><a href="#" className='text-gray-400 hover:text-white'>iOS</a></li>
        </ul>
      </div>
      <div className='text-center md:text-start'>
        <h2 className='text-lg font-semibold mb-4'>Design to Code</h2>
        <ul className='space-y-2'>
          <li><a href="#" className='text-gray-400 hover:text-white'>Figma Plugin</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>Templates</a></li>
        </ul>
      </div>
      <div className='text-center md:text-start'>
        <h2 className='text-lg font-semibold mb-4'>Comparison</h2>
        <ul className='space-y-2'>
          <li><a href="#" className='text-gray-400 hover:text-white'>D vs Anima</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>D vs AppSmith</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>D vs Flutterflow</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>D vs Monday Here</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>D vs Figma</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>D vs Figma Dev Mode</a></li>
        </ul>
      </div>
      <div className='text-center md:text-start'>
        <h2 className='text-lg font-semibold mb-4'>Company</h2>
        <ul className='space-y-2'>
          <li><a href="/about" className='text-gray-400 hover:text-white'>About Us</a></li>
          <li><a href="/contact" className='text-gray-400 hover:text-white'>Contact Us</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>Career</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>Terms of Service</a></li>
          <li><a href="#" className='text-gray-400 hover:text-white'>Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    </footer>
    <div className='container mx-auto p-3 flex flex-col md:flex-row justify-between items-center'>
      <div className='text-xl font-semibold hidden md:flex'>
        Blog<span className='text-blue-500 font-bold'>Platform</span>
      </div>
      <div className='text-gray-400 text-sm hidden md:flex'>
        <p>&copy; 2025 D Pvt. Ltd. All Rights Reserved</p>
      </div>
      <div className='mt-4 md:mt-0 flex space-x-4'>
        <a href="#">
          <FaGithub className="h-10" />
        </a>
        <a href="#">
          <FaYoutube className="h-10" />
        </a>
        <a href="#">
          <FaLinkedin className="h-10" />
        </a>
      </div>

    </div>
    
    </>
  )
}

export default Footer