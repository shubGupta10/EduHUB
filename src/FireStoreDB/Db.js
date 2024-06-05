import firebaseApp from "../config/FirebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const fireStore = getFirestore(firebaseApp);

//add Course to FireStore
const addCourseToFirestore = async (courseData) => {
    try {
        const result = await addDoc(collection(fireStore, "courses"), courseData);
        console.log("Course added successfully with ID: ", result.id);
        return result.id; 
    } catch (error) {
        console.error("Error adding course: ", error);
        throw error; 
    }
};

export default addCourseToFirestore;
