import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartLine,
  faClipboard,
  faComments,
  faUser,
  faFileAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import { useFirebase } from "../Context/FirebaseContext";
import Loader from "../Components/Loader";

const Dashboard = () => {
  const courseId = localStorage.getItem("courseId");
  const courseName = localStorage.getItem("courseName");
  const { matchUser, user } = useFirebase();
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await matchUser(user);
        setCurrentUser(result);
        setUserRole(result.role);
      } catch (error) {
        console.error("Failed to fetch Current User", error);
      }
    };
    fetchCurrentUser();
  }, [user, matchUser]);

  if (currentUser === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const DashboardCard = ({ icon, title, description, linkTo, buttonText, imageSrc }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl"
      variants={cardVariants}
    >
      <div className="h-48 overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover object-center transition duration-300 hover:scale-110" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-800">
          <FontAwesomeIcon icon={icon} className="mr-2 text-black" />
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={linkTo}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-300 text-sm font-medium"
          >
            {buttonText}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r  from-gray-900 to-black text-white py-20 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the EduHub Dashboard
          </h1>
          <p className="text-xl text-gray-300">Your gateway to learning and growth</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <DashboardCard
            icon={faBook}
            title="View Courses"
            description="Explore our wide range of courses designed to enhance your skills."
            linkTo="/dashboard/viewcourse"
            buttonText="Browse Courses"
            imageSrc="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          />

          <DashboardCard
            icon={faChartLine}
            title="Course Progress"
            description="Track your learning journey and see how far you've come."
            linkTo={`/dashboard/coursedetail/${courseId}/${courseName}`}
            buttonText="Check Progress"
            imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          />

          {userRole === "student" && (
            <DashboardCard
              icon={faPencilAlt}
              title="Quiz Competition"
              description="Test your knowledge with our daily quiz challenges."
              linkTo="/quizrules"
              buttonText="Start Quiz"
              imageSrc="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />
          )}

          {(userRole === "Admin" || userRole === "teacher") && (
            <DashboardCard
              icon={faUser}
              title="Add Courses"
              description="Create and manage new courses for our learning community."
              linkTo="/addcourse"
              buttonText="Create Course"
              imageSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />
          )}

          {["student", "Admin", "teacher"].includes(userRole) && (
            <>
              <DashboardCard
                icon={faFileAlt}
                title="Explore Tech World"
                description="Stay updated with the latest trends and innovations in technology."
                linkTo="/resources"
                buttonText="Discover More"
                imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />

              <DashboardCard
                icon={faClipboard}
                title="Assignments"
                description="Access and submit your course assignments with ease."
                linkTo="/assignmentpage"
                buttonText="View Tasks"
                imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />

              <DashboardCard
                icon={faComments}
                title="Discussion Forums"
                description="Engage in meaningful conversations with peers and instructors."
                linkTo="/homechat"
                buttonText="Join Discussions"
                imageSrc="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />

              <DashboardCard
                icon={faUser}
                title="Our Teachers"
                description="Get to know the expert instructors behind our courses."
                linkTo="/listallteachers"
                buttonText="Meet the Team"
                imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
            </>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;