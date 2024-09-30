import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFirebase } from "../../Context/FirebaseContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";

const StudentDetailForm = () => {
  const { courseId, courseName } = useParams();
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [yearOrSemester, setYearOrSemester] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const navigate = useNavigate();

  const { currentUser, createStudentDetails } = useFirebase();

  useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.displayName || "");
      setStudentEmail(currentUser.email || "");
      setStudentId(currentUser.uid);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentCourseEnrollData = {
        studentName,
        studentEmail,
        courseId,
        courseName,
        studentId,
        phoneNumber,
        degreeProgram,
        yearOrSemester,
        paymentMethod,
        paymentDetails,
      };
      await createStudentDetails(studentCourseEnrollData);
      toast.success("Student Enrolled into the Course");
      navigate(`/dashboard/${courseId}/${courseName}`);
      localStorage.setItem("courseId", courseId);
      localStorage.setItem("courseName", courseName);
    } catch (error) {
      toast.error("Student Enrollment Failed");
      console.log(error);
    }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={formAnimation}
      >
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Student Course Enrollment Form
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Please fill in the form below to enroll in the course. Ensure all
            details are accurate.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={inputAnimation}>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter full name"
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">
                Student Email
              </label>
              <input
                type="email"
                id="studentEmail"
                readOnly
                value={studentEmail || ""}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm"
                placeholder="Enter email"
                onCopy={(e) => e.preventDefault()}
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
                Course ID
              </label>
              <input
                type="text"
                id="courseId"
                value={courseId}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm"
                onCopy={(e) => e.preventDefault()}
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm"
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                readOnly
                value={studentId}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm"
                placeholder="Enter student ID"
                onCopy={(e) => e.preventDefault()}
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter phone number"
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700">
                Degree Program
              </label>
              <input
                type="text"
                id="degreeProgram"
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter degree program"
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="yearOrSemester" className="block text-sm font-medium text-gray-700">
                Year or Semester
              </label>
              <input
                type="text"
                id="yearOrSemester"
                value={yearOrSemester}
                onChange={(e) => setYearOrSemester(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter year or semester"
              />
            </motion.div>

            <motion.div variants={inputAnimation}>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </motion.div>

            {paymentMethod === "creditCard" && (
              <motion.div variants={inputAnimation}>
                <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700">
                  Payment Details
                </label>
                <input
                  type="text"
                  id="paymentDetails"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Enter credit card details"
                />
              </motion.div>
            )}

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
              >
                Enroll
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default StudentDetailForm;