// Import the function to initialize a Firebase app from the Firebase SDK
import { initializeApp } from "firebase/app";

// Import Firestore functions to access the database
// - getFirestore: creates a Firestore instance
// - collection: references a collection in Firestore
// - getDocs: fetches all documents from a collection
import { getFirestore, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for additional Firebase products if needed
// More info: https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration object
// This contains all the keys and identifiers for your Firebase project
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  
// Initialize the Firebase app using the configuration above
// This sets up Firebase for use in your project
const app = initializeApp(firebaseConfig); 

// Create a Firestore database instance
// This will be used to access collections and documents
const db = getFirestore(app); 

// Export an asynchronous function to fetch all posts from Firestore
export async function getSortedPostsData() {
  // Create a reference to the "posts" collection in Firestore
  // All your post documents live in this collection
  const postsCollection = collection(db, "posts"); 

  // Fetch all documents from the "posts" collection
  // Returns a snapshot containing all posts
  const postsSnapshot = await getDocs(postsCollection); 

  // Map over the snapshot documents to create an array of post objects
  // Each object includes the document ID and all its fields (title, date, author, age, etc.)
  const postsList = postsSnapshot.docs.map(doc => ({ 
    id: doc.id,     // Document ID (used for URLs)
    ...doc.data()   // Spread all other fields in the document
  })); 

  // Return the array of post objects to be used in Next.js pages
  return postsList; 
}
