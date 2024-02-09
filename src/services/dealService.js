import Deal from "../models/deal";
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
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
function getStartOfDay(date = new Date()) {
  date.setHours(0, 0, 0, 0);
  return date;
}

function getEndOfDay(date = new Date()) {
  date.setHours(23, 59, 59, 999);
  return date;
}

function getStartOfWeek(date = new Date()) {
  const day = date.getDay();
  const start = new Date(date);
  start.setDate(date.getDate() - day);
  return getStartOfDay(start);
}

function getEndOfWeek(date = new Date()) {
  const end = new Date(getStartOfWeek(date));
  end.setDate(end.getDate() + 6);
  return getEndOfDay(end);
}

function getStartOfMonth(date = new Date()) {
  const start = new Date(date);
  start.setDate(1);
  return getStartOfDay(start);
}

function getEndOfMonth(date = new Date()) {
  const end = new Date(getStartOfMonth(date));
  end.setMonth(end.getMonth() + 1);
  end.setDate(0); // Last day of the previous month
  return getEndOfDay(end);
}

class DealService {
  collectionRef;

  constructor() {
    this.collectionRef = collection(db, "deals");
  }

  getDealsByDateRange = async (start, end) => {
    const db = getFirestore();
    const dealsCollection = collection(db, "deals");

    // Query deals between start and end dates
    const q = query(
      dealsCollection,
      where("time", ">=", start),
      where("time", "<=", end)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map over the documents and extract data
    const deals = querySnapshot.docs.map((doc) => doc.data());

    return deals;
  };

  getDealsForToday = async () => {
    const startOfDay = getStartOfDay();
    const endOfDay = getEndOfDay();
    return this.getDealsByDateRange(startOfDay, endOfDay);
  };

  getDealsForThisWeek = async () => {
    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();
    return this.getDealsByDateRange(startOfWeek, endOfWeek);
  };

  getDealsForThisMonth = async () => {
    const startOfMonth = getStartOfMonth();
    const endOfMonth = getEndOfMonth();
    return this.getDealsByDateRange(startOfMonth, endOfMonth);
  };

  // Get all deals
  getAllDeals = async () => {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((doc) => Deal.createFromSnap(doc.data()));
  };

  getDealsByIds = async (ids) => {
    const db = getFirestore();
    const dealsCollection = collection(db, "deals");

    // Create a query against the collection for multiple ids
    const q = query(dealsCollection, where("id", "in", ids));

    // Execute the query
    const querySnapshot = await getDocs(q);
    let rv = [];
    querySnapshot.docs.map((m) => {
      rv.push(m.data());
    });
    return rv;
  };

  // Get a single deal
  getDeal = async (id) => {
    const db = getFirestore();
    const dealsCollection = collection(db, "deals");

    // Create a query against the collection
    const q = query(dealsCollection, where("id", "==", id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0];
  };

  // Create a new deal
  createDeal = async (deal) => {
    deal.id = uuidv4();
    return await addDoc(this.collectionRef, deal);
  };

  // Update an existing deal
  updateDealById = async (id, updatedFields) => {
    const db = getFirestore();
    const dealsCollection = collection(db, "deals");

    // Create a query against the collection
    const q = query(dealsCollection, where("id", "==", id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "deals", querySnapshot.docs[0].id);

      // Perform the update
      await updateDoc(docRef, updatedFields);
      console.log("Document updated successfully");
    } else {
      console.log("No document found with the provided id");
    }
  };

  // Delete a deal
  deleteDeal = async (id) => {
    const db = getFirestore();
    const dealsCollection = collection(db, "deals");

    const q = query(dealsCollection, where("id", "==", id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "deals", querySnapshot.docs[0].id);

      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    } else {
      console.log("No document found with the provided id");
    }
  };
}

export const dealService = new DealService();
