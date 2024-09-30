import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFirebase } from "../Context/FirebaseContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";

const Login = () => {
  const {courseid, coursename} = useFirebase();
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const courseId = localStorage.getItem("courseId") || courseid;
  const courseName = localStorage.getItem("courseName") || coursename;

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebase.LoginUser(email, password);
      toast.success("Login Successful!");
      navigate(courseId && courseName ? `/dashboard/${courseId}/${courseName}` : "/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.error("Error Occurred", error);
      toast.error("Error occurred. Please try again!");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090d15] to-black flex flex-col justify-center items-center py-10">
      {isLoading && <Loader />}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl mt-20 bg-gray-900 text-white rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>
        <p className="text-center text-gray-400 mb-8">Welcome back! Please log in to continue.</p>
        <form onSubmit={handleLoginForm} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formEmail">
              Email address
            </label>
            <input
              id="formEmail"
              type="email"
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formPassword">
              Password
            </label>
            <input
              id="formPassword"
              type="password"
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-md transition duration-300 hover:bg-purple-700"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center mt-8 text-gray-400">Don't have an account?</p>
        <p className="text-center mt-2">
          <Link
            to="/register"
            className="text-purple-400 hover:underline font-semibold"
          >
            Create a new account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;