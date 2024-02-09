import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

class ProjectService {
  collectionRef;

  constructor() {
    this.collectionRef = collection(db, "projects");
  }

  // Get all projects
  getAllProjects = async () => {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => ({ ...doc.data() }));
  };

  // Get a single project
  getProject = async (id) => {
    const db = getFirestore();
    const projectsCollection = collection(db, "projects");

    // Create a query against the collection
    const q = query(projectsCollection, where("id", "==", id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0];
  };

  // Create a new project
  createProject = async (project) => {
    project.id = uuidv4();
    return await addDoc(this.collectionRef, project);
  };

  // Update an existing project
  updateProject = async (id, updatedProject) => {
    const db = getFirestore();
    const projectsCollection = collection(db, "projects");

    // Create a query against the collection
    const q = query(projectsCollection, where("id", "==", id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "projects", querySnapshot.docs[0].id);

      // Perform the update
      await updateDoc(docRef, updatedProject);
      console.log("Document updated successfully");
    } else {
      console.log("No document found with the provided id");
    }
  };

  // Delete a project
  deleteProject = async (id) => {
    const db = getFirestore();
    const projectsCollection = collection(db, "projects");

    const q = query(projectsCollection, where("id", "==", id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "projects", querySnapshot.docs[0].id);

      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    } else {
      console.log("No document found with the provided id");
    }
  };
}

export const projectService = new ProjectService();
