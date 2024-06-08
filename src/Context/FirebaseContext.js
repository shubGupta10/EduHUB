import React, { createContext, useContext, useEffect, useState } from 'react';
import firebaseApp from '../config/FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {addCourseToFirestore, getCoursesFromFirestore, createUser, createStudentDetails, getCoursesById} from "../FireStoreDB/Db.js"
import { getStorage } from 'firebase/storage';

const fireBaseContext = createContext(null);
const firebaseAuth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);


export const useFirebase = () => useContext(fireBaseContext);

const FireBaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser , setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
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

  const SignOutUser = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Error in Logout", error);
      throw error;
    }
  };

  const isLoggedIn = !!user;

  return (
    <fireBaseContext.Provider value={{ app: firebaseApp, RegisterUser, LoginUser, SignOutUser, isLoggedIn, addCourseToFirestore, getCoursesFromFirestore, currentUser ,createUser ,loading, createStudentDetails, getCoursesById }}>
      {props.children}
    </fireBaseContext.Provider>
  );
};

export default FireBaseProvider;