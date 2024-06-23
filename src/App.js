import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.css";
import { useFirebase } from './Context/FirebaseContext.js';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ViewCourses from './Pages/Universal Pages/ViewCourses';
import StudentDetailForm from './Pages/Student Page/StudentDetails.jsx'
import CourseOverview from './Pages/Universal Pages/CourseOverview.jsx';
import CourseProgress from './Pages/Student Page/CourseProgress.jsx';
import AssignmentPage from './Pages/Admin Page/AssignmenPage.jsx';
import QuizPage from './Quiz Module/QuizPage.jsx';
import QuizRulesPage from './Quiz Module/QuizRulesPage.jsx';

// Components
import MyNavbar from './Components/Navbar.jsx';
import Loader from './Components/Loader.jsx';
import AddCourse from './Pages/Admin Page/AddCourse.jsx';
import CourseDetail from './Components/CourseDetail.jsx';
import TeachersList from './Pages/Universal Pages/TeachersList.jsx';
import Profile from './Components/Profile.jsx';
import HomeChat from './Pages/DiscussionForum/HomeChat.jsx';
import ChatRoom from './Pages/DiscussionForum/ChatRoom.jsx';
import Resource from './Resource Library/Resource.jsx';


const App = () => {
  const firebase = useFirebase();

  const ProtectedRoute = ({ element: Component }) => {
    if (firebase.loading) {
      return <Loader />;
    }

    console.log("ProtectedRoute: isLoggedIn =", firebase.isLoggedIn);
    return firebase.isLoggedIn ? <Component /> : <Navigate to="/login" replace />
  };

  return (
    <div>
      {firebase.loading ? <Loader /> : <MyNavbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/:courseId/:courseName' element={<ProtectedRoute element={Dashboard} />} />
        <Route path='/profile' element={<ProtectedRoute element={Profile}/>}/>
        <Route path='/addcourse' element={<ProtectedRoute element={AddCourse} />}/>
        <Route path='/listallteachers' element={<ProtectedRoute element={TeachersList}/>}/>
        <Route path='/dashboard/viewcourse' element={<ProtectedRoute element={ViewCourses}/>}/>
        <Route path='/dashboard/coursedetail/:courseId/courseprogress' element={<ProtectedRoute element={CourseProgress}/>}/>
        <Route path='/dashboard/courseoverview' element={<ProtectedRoute element={CourseOverview}/>}/>
        <Route path='/dashboard/coursedetail/:courseId/:courseName' element={<ProtectedRoute element={CourseDetail}/>}/>
        <Route path='/courseoverview/:courseId/:courseName' element={<ProtectedRoute element={CourseOverview}/>}/>
        <Route path='/studentdetails/:courseId/:courseName' element={<ProtectedRoute element={StudentDetailForm} />} />
        <Route path='/assignmentpage' element={<ProtectedRoute element={AssignmentPage} />}/>
        <Route path='/quizpage' element={<ProtectedRoute element={QuizPage}/>}/>
        <Route path='/quizrules' element={<ProtectedRoute element={QuizRulesPage}/>}/>
        <Route path='/homechat' element={<ProtectedRoute element={HomeChat} />}/>
        <Route path='/chatRoom' element={<ProtectedRoute element={ChatRoom}/>}/>
        <Route path='/resources' element={<ProtectedRoute element={Resource}/>}/>
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
