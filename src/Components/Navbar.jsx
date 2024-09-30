import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFirebase } from "../Context/FirebaseContext";
import { Menu, X, ChevronDown, Home, BookOpen, Users, MessageCircle, Settings, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

function MyNavbar() {
  const firebase = useFirebase();
  const { matchUser, user } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await matchUser(user);
        setCurrentUser(result);
      } catch (error) {
        console.error("Failed to fetch Current User", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [user, matchUser]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await firebase.getAllUsers();
        setUserRoles(users.map((user) => user.role));
      } catch (error) {
        console.error("Failed to get all users", error);
      }
    };
    fetchAllUsers();
  }, [firebase]);

  const logoutUser = () => {
    firebase.SignOutUser();
    navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }

  const handleClick = () => {
    navigate("/");
  };

  const courseId = localStorage.getItem("courseId");
  const courseName = localStorage.getItem("courseName");

  return (
    <nav className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 text-white shadow-lg backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-white no-underline text-3xl font-bold font-['Montserrat'] tracking-wider">
              EduHub
            </Link>
          </motion.div>

          {/* Navigation Links (centered) */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-1">
            <NavLink to="/" icon={<Home />} active={location.pathname === "/"}>Home</NavLink>
            {firebase.isLoggedIn && currentUser && (
              <NavLink to={`/dashboard/${courseId}/${courseName}`} icon={<BookOpen />} active={location.pathname === "/dashboard"}>Dashboard</NavLink>
            )}
            <NavLink to="/dashboard/viewcourse" icon={<BookOpen />} active={location.pathname === "/dashboard/viewcourse"}>Courses</NavLink>
            <NavLink to="/listallteachers" icon={<Users />} active={location.pathname === "/listallteachers"}>Instructors</NavLink>
          </div>

          {/* User Profile / Login / Register */}
          <div className="hidden md:block">
            {firebase.isLoggedIn && currentUser ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-white text-black rounded-full flex items-center text-lg px-4 py-2 focus:outline-none transition duration-300 ease-in-out"
                >
                  <img className="h-10 w-10 rounded-full object-cover mr-2" src={currentUser.dp} alt="" />
                  <span className="font-medium">{currentUser.displayName}</span>
                  <ChevronDown className="ml-2 h-5 w-5" />
                </motion.button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <DropdownLink to="/profile" icon={<User size={18} />}>Profile</DropdownLink>
                      <DropdownLink to="/settings" icon={<Settings size={18} />}>Settings</DropdownLink>
                      <button
                        onClick={logoutUser}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="bg-white text-black px-6 py-2 rounded-md text-lg font-medium no-underline transition duration-300 ease-in-out hover:bg-gray-200">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="bg-black text-white border-2 border-white px-6 py-2 rounded-md text-lg font-medium no-underline transition duration-300 ease-in-out hover:bg-gray-900">
                    Register
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-8 w-8" /> : <Menu className="block h-8 w-8" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" icon={<Home />}>Home</MobileNavLink>
              {firebase.isLoggedIn && currentUser && (
                <MobileNavLink to={`/dashboard/${courseId}/${courseName}`} icon={<BookOpen />}>Dashboard</MobileNavLink>
              )}
              <MobileNavLink to="/dashboard/viewcourse" icon={<BookOpen />}>Courses</MobileNavLink>
              <MobileNavLink to="/listallteachers" icon={<Users />}>Instructors</MobileNavLink>
              <MobileNavLink to="/homechat" icon={<MessageCircle />}>Discussion</MobileNavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              {firebase.isLoggedIn && currentUser ? (
                <>
                  <div className="flex items-center  px-5">
                    <img className="h-12 w-12 rounded-full object-cover" src={currentUser.dp} alt="" />
                    <div className="ml-3">
                      <div className="text-lg text-blue-500 font-medium">{currentUser.displayName}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2  space-y-1">
                    <MobileNavLink to="/profile" icon={<User />}>Profile</MobileNavLink>
                    <MobileNavLink to="/settings" icon={<Settings />}>Settings</MobileNavLink>
                    <button
                      onClick={logoutUser}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <Link to="/login" className="bg-white text-black px-6 py-2 rounded-md text-lg font-medium no-underline transition duration-300 ease-in-out hover:bg-gray-200">Login</Link>
                  <Link to="/register" className="bg-black text-white border-2 border-white px-6 py-2 rounded-md text-lg font-medium no-underline transition duration-300 ease-in-out hover:bg-gray-900">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const NavLink = ({ to, icon, active, children }) => (
  <Link
    to={to}
    className={`flex items-center no-underline px-4 py-2 text-lg font-medium ${active ? "text-blue-500" : "text-white hover:text-blue-300"} transition duration-300`}
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center px-4 no-underline py-2 text-lg font-medium  text-white hover:bg-gray-700 transition duration-300"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const DropdownLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center w-full text-left no-underline px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

export default MyNavbar;
