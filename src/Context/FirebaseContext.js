import React, { createContext, useContext, useEffect, useState } from 'react';
import firebaseApp from '../config/FirebaseConfig';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {addCourseToFirestore, getCoursesFromFirestore, createUser, createStudentDetails, getCoursesById, matchUser, uploadAssignmentDocument, fetchAssignment, completeAssignment, fetchAllUsers, getAllUsers, uploadMessages, fetchMessages} from "../FireStoreDB/Db.js"

import { getStorage } from 'firebase/storage';

const fireBaseContext = createContext(null);
export const firebaseAuth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);


export const useFirebase = () => useContext(fireBaseContext);

const FireBaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser , setCurrentUser] = useState(null);
  const GoogleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if(user){
        setCurrentUser(user);
      }else{
        setCurrentUser(null);
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const RegisterUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const LoginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Error in Login", error);
      throw error;
    }
  };

  const registerWithGoogle = async () => {
    const googleLoggedinUser = await signInWithPopup(firebaseAuth, GoogleProvider);
    console.log(googleLoggedinUser);
  }

  const SignOutUser = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Error in Logout", error);
      throw error;
    }
  };

  const courseid = localStorage.getItem("courseId");
  const coursename = localStorage.getItem("courseName");

  const isLoggedIn = !!user;

  return (
    <fireBaseContext.Provider value={{ app: firebaseApp, user, RegisterUser, LoginUser, SignOutUser, isLoggedIn, addCourseToFirestore, getCoursesFromFirestore, currentUser ,createUser ,loading, createStudentDetails, getCoursesById, matchUser,  uploadAssignmentDocument, fetchAssignment, completeAssignment,  fetchAllUsers, getAllUsers, registerWithGoogle, uploadMessages, fetchMessages, courseid, coursename }}>
      {props.children}
    </fireBaseContext.Provider>
  );
};

export default FireBaseProvider;