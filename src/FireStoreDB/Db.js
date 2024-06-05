import firebaseApp from "../config/FirebaseConfig";
import { getFirestore, addDoc, collection , getDocs} from "firebase/firestore";

const fireStore = getFirestore(firebaseApp);

//add Course to FireStore
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


//get the courses 
export const getCoursesFromFirestore = async () => {
    const courseCollection = collection(fireStore, "courses");
    return await getDocs(courseCollection);
}

//storing all the data of users into fireStore
export const createUser = async (userData) => {
    try {
        const addingUser = await addDoc(collection(fireStore, "Users"), userData);
        console.log("User added Successfully: ", addingUser.id);
        return addingUser.id;
    } catch (error) {
        console.error("Failed to add new user: ", error);
        throw error; 
    }
}