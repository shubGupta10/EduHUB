import { v4 as uuidv4 } from 'uuid';
import firebaseApp from "../config/FirebaseConfig";
import { getFirestore, addDoc, collection, getDocs, doc, getDoc , query, where} from "firebase/firestore";

const fireStore = getFirestore(firebaseApp);

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


export const uploadAssignmentDocument =  async (AssignmentData) => {
    try {
        const result = await addDoc(collection(fireStore, "Assignment"), AssignmentData);
        console.log("Assignment Uploaded with ID: ", result.id);
        return result.id;
    } catch (error) {
        console.error("Error uploading Assignment", error);
        throw new Error
    }
};


export const completeAssignment = async (CompletedAssignmentData) => {
    try {
       
        const submitAssignment = await addDoc(collection(fireStore, "CompletedAssignment"), CompletedAssignmentData);
        console.log("Assignment uploaded with ID:", submitAssignment.id);
        return submitAssignment.id;
    } catch (error) {
        console.error("Failed to submit Assignment", error);
        throw new Error(error);
    }
};

export const fetchAssignment = async (courseId) => {
    try {
        const assignmentsRef = collection(fireStore, "Assignment");
        const q = query(assignmentsRef, where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);

        const assignments = [];
        querySnapshot.forEach((doc) => {
            assignments.push({ id: doc.id, ...doc.data() });
            console.log(assignments);
        });

        return assignments;
    } catch (error) {
        console.error("Failed to fetch Assignments:", error);
        throw error;
    }
}

export const getCoursesFromFirestore = async () => {
    const courseCollection = collection(fireStore, "courses");
    return await getDocs(courseCollection);
}

export const getCoursesById = async (courseId) => {
    try {
        const courseRef = doc(collection(fireStore, 'courses'), courseId);
        const docSnapshot = await getDoc(courseRef);

        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            throw new Error('Course not found');
        }
    } catch (error) {
        console.error('Error getting course:', error);
        throw error;
    }
};


export const fetchAllUsers = async () => {
    try {
      const usersRef = collection(fireStore, "Users");
      const querySnapshot = await getDocs(usersRef);
      
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.role === "teacher") {
            users.push({ id: doc.id, ...userData });
          }
        } else {
          console.log("No such document!");
        }
      });
      return users;
    } catch (error) {
      console.error("Failed getting users", error);
      throw error;
    }
  };

  export const getAllUsers = async () => {
    try {
      const usersRef = collection(fireStore, "Users");
      const snapshot = await getDocs(usersRef);
  
      const users = [];
      snapshot.forEach((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.role === "teacher" || userData.role === "Admin") {
            users.push({ id: doc.id, ...userData });
          }
        } else {
          console.log("No such document!");
        }
      });
      return users;
    } catch (error) {
      console.error("Failed getting users", error);
      throw error;
    }
  };
  

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

export const matchUser = async (user) => {
    try {
        if (!user) {
            throw new Error('No user currently logged in');
        }

        const userQuery = collection(fireStore, 'Users');
        const querySnapshot = await getDocs(userQuery);
        let matchedUser = null;

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.email === user.email) {
                // console.log("User data from Firestore:", userData);
                matchedUser = userData;
            }
        });

        if (matchedUser) {
            console.log("Current user:", user);
            return matchedUser;
        } else {
            throw new Error('User not found in Firestore');
        }
    } catch (error) {
        console.error("Error matching user:", error);
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





