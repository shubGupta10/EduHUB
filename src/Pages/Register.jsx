import React, { useState } from "react";
import { motion } from "framer-motion";
import { storage, useFirebase } from "../Context/FirebaseContext.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [dp, setDp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await firebase.RegisterUser(email, password);

      let DpUrl = "";
      if (dp) {
        const dpRef = ref(storage, `UserDp/${Date.now()}_${dp.name}`);
        const snapshot = await uploadBytes(dpRef, dp);
        DpUrl = await getDownloadURL(snapshot.ref);
      }

      const userData = {
        displayName,
        email,
        role,
        userID: uuidv4(),
        dp: DpUrl,
      };
      await firebase.createUser(userData);

      toast.success("Account creation successful");
      navigate("/dashboard/viewcourse");
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.error("Failed in account creation", error);
      toast.error("Failed to create account");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center py-10">
      {isLoading && <Loader />}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-[#090d15] mt-20 text-white rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegisterForm} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formDisplayName">
              Display Name
            </label>
            <input
              id="formDisplayName"
              type="text"
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formEmail">
              Email Address
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
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formRole">
              Select Your Role
            </label>
            <select
              id="formRole"
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
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
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formConfirmPassword">
              Confirm Password
            </label>
            <input
              id="formConfirmPassword"
              type="password"
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Confirm your password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="formUserdp">
              Upload your Image
            </label>
            <input
              id="formUserdp"
              type="file"
              accept="image/*"
              className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              onChange={(e) => setDp(e.target.files[0])}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-md transition duration-300 hover:bg-purple-700 mt-6"
          >
            Register
          </motion.button>
        </form>
        <p className="text-center mt-8 text-gray-400">Already have an account?</p>
        <p className="text-center mt-2">
          <Link to="/login" className="text-purple-400 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;