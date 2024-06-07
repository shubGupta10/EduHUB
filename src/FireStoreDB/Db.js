import { v4 as uuidv4 } from 'uuid';
import firebaseApp from "../config/FirebaseConfig";
import { getFirestore, addDoc, collection, getDocs, doc } from "firebase/firestore";

const fireStore = getFirestore(firebaseApp);

// Add Course to Firestore
export const addCourseToFirestore = async (courseData) => {
    try {
        const result = await addDoc(collection(fireStore, "courses"), courseData);
        console.log("Course added successfully with ID: ", result.id);
        return result.id; 
    } catch (error) {
        console.error("Error adding course: ", error);
        throw error; 
    }
};

// Get the courses 
export const getCoursesFromFirestore = async () => {
    const courseCollection = collection(fireStore, "courses");
    return await getDocs(courseCollection);
}

// Storing all the data of users into Firestore
export const createUser = async (userData) => {
    try {
        const userID = uuidv4();
        const userWithID = { ...userData, userID };

        const addingUser = await addDoc(collection(fireStore, "Users"), userWithID);
        console.log("User added Successfully with userID: ", addingUser.id, " and generated userID: ", userID);
        return addingUser.id;
    } catch (error) {
        console.error("Failed to add new user: ", error);
        throw error; 
    }
};


export const createStudentDetails = async (studentCourseEnrollData) => {
    try {
        const userID = uuidv4();
        const studentWithID = { ...studentCourseEnrollData, userID }; 

        const addingStudent = await addDoc(collection(fireStore, "Students"), studentWithID);
        console.log("Student added successfully with ID: ", addingStudent.id);
        
        return addingStudent.id;
    } catch (error) {
        console.error("Failed to add new Student: ", error);
        throw error; 
    }
};
