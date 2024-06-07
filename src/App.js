import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
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

// Components
import MyNavbar from './Components/Navbar.jsx';
import Loader from './Components/Loader.jsx';
import AddCourse from './Pages/Admin Page/AddCourse.jsx';
import StudentDetails from './Pages/Student Page/StudentDetails.jsx';

const App = () => {
  const firebase = useFirebase();

  const ProtectedRoute = ({ element: Component }) => {
    if (firebase.loading) {
      return <Loader />;
    }

    console.log("ProtectedRoute: isLoggedIn =", firebase.isLoggedIn);
    return firebase.isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
  };

  return (
    <div>
      {firebase.loading ? <Loader /> : <MyNavbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} />} />
        <Route path='/addcourse' element={<ProtectedRoute element={AddCourse} />}/>
        <Route path='/dashboard/viewcourse' element={<ProtectedRoute element={ViewCourses}/>}/>
        <Route path='/studentdetails' element={<ProtectedRoute element={StudentDetails}/>}/>
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;