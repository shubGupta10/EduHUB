import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { storage, useFirebase } from "../../Context/FirebaseContext";
import Loader from "../../Components/Loader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";

const AssignmentPage = () => {
  const courseId = localStorage.getItem("courseId");

  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    getCoursesById,
    user,
    matchUser,
    uploadAssignmentDocument,
    fetchAssignment,
    completeAssignment,
  } = useFirebase();
  const [course, setCourse] = useState(null);
  const [fetchingAssignment, setFetchingAssignment] = useState([]);
  const [submitAssignmentFile, setSubmitAssignmentFile] = useState(null);

  // Form data
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [instructor, setInstructor] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCoursesById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching data");
        throw new Error();
      }
    };
    fetchCourseData();
  }, [courseId, getCoursesById]);

  useEffect(() => {
    const fetchingAssignmentfromDb = async (courseId) => {
      try {
        const fetchAssignmentfromfirebase = await fetchAssignment(courseId);
        setFetchingAssignment(fetchAssignmentfromfirebase);
      } catch (error) {
        console.error("Failed to fetch Assignments, Please Try Again");
      }
    };

    fetchingAssignmentfromDb(courseId);
  }, [courseId]);

  useEffect(() => {
    const fetchUserWithId = async () => {
      try {
        const fetchedUser = await matchUser(user);
        setUserRole(fetchedUser.role);
        setUserInfo(fetchedUser);
      } catch (error) {
        console.error("Can't find the user");
        throw new Error();
      } finally {
        setLoading(false);
      }
    };
    fetchUserWithId();
  }, [user, matchUser]);

  if (loading) {
    return <Loader />;
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let AssignmentUrl = "";
      if (assignmentFile) {
        const DocRef = ref(
          storage,
          `AssignmentsQuestions/${Date.now()}_${assignmentFile.name}`
        );
        const snapshot = await uploadBytes(DocRef, assignmentFile);
        AssignmentUrl = await getDownloadURL(snapshot.ref);
      }

      const AssignmentDocumentId = uuidv4();
      const AssignmentData = {
        AssignmentDocumentId,
        assignmentTitle,
        assignmentDate,
        deadline,
        instructor,
        AssignmentUrl,
        courseId,
      };

      await uploadAssignmentDocument(AssignmentData);
      toast.success("Assignment Uploaded!");
      setAssignmentTitle("");
      setAssignmentDate("");
      setDeadline("");
      setInstructor("");
      setAssignmentFile(null);
    } catch (error) {
      toast.error("Failed to add Assignment");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSubmitAssignmentFile(e.target.files[0]);
  };

  const handleSubmitAssignment = async (e, assignmentId) => {
    e.preventDefault();
    try {
      setLoading(true);

      let SubmitAssignmentUrl = "";
      if (submitAssignmentFile) {
        const SubmitDocRef = ref(
          storage,
          `SubmittedAssignments/${Date.now()}_${submitAssignmentFile.name}`
        );
        const snapshot = await uploadBytes(SubmitDocRef, submitAssignmentFile);
        SubmitAssignmentUrl = await getDownloadURL(snapshot.ref);

        const CompletedAssignmentData = {
          AssignmentDocumentId: uuidv4(),
          studentId: user.uid,
          submissionDate: new Date().toISOString(),
          SubmitAssignmentUrl,
          courseId,
        };

        await completeAssignment(CompletedAssignmentData);
        toast.success("Assignment Submitted!");
        setSubmitAssignmentFile(null);
      } else {
        toast.error("Please select a file to submit.");
      }
    } catch (error) {
      console.error("Failed to submit assignment:", error);
      toast.error("Failed to submit assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 pt-24 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          {userRole === "student"
            ? `Welcome ${userInfo.displayName}, Check your Assignments here`
            : `Welcome to the Assignment Management Page, ${userInfo.displayName}`}
        </motion.h1>

        {userRole === "student" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fetchingAssignment.map((assignment, index) => (
                <motion.div
                  key={assignment.AssignmentDocumentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {assignment.assignmentTitle}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Assignment Date: {assignment.assignmentDate}
                    </p>
                    <p className="text-red-600 font-semibold mb-2">
                      Deadline: {assignment.deadline}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Instructor: {course.courseInstructor}
                    </p>
                    <button
                      onClick={() => window.open(assignment.AssignmentUrl, "_blank")}
                      className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                    >
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Submit Your Assignment
              </h3>
              <form onSubmit={handleSubmitAssignment}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignmentFile">
                    Upload Assignment File
                  </label>
                  <input
                    type="file"
                    id="assignmentFile"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                >
                  Submit Assignment
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Assignment for Students
            </h3>
            <form onSubmit={handleSubmitForm}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignmentTitle">
                  Assignment Title
                </label>
                <input
                  type="text"
                  id="assignmentTitle"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignmentDate">
                  Assignment Date
                </label>
                <input
                  type="date"
                  id="assignmentDate"
                  value={assignmentDate}
                  onChange={(e) => setAssignmentDate(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor">
                  Instructor
                </label>
                <input
                  type="text"
                  id="instructor"
                  value={course ? course.courseInstructor : ""}
                  readOnly
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignmentFile">
                  Upload File
                </label>
                <input
                  type="file"
                  id="assignmentFile"
                  onChange={(e) => setAssignmentFile(e.target.files[0])}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Upload Assignment
              </button>
            </form>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AssignmentPage;