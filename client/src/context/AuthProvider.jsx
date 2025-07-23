import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [blogs, setBlogs] = useState();
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/blog/all-blogs");
            console.log(response.data.blogs);
            setBlogs(response.data.blogs);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProfile = async () => {
        try {
                const response = await axios.get("http://localhost:3000/api/user/profile", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                console.log(response.data.user);
                setProfile(response.data.user);
                setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogs();
        fetchProfile();
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ blogs, profile, isAuthenticated, setIsAuthenticated, setProfile }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);