import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firstorConfig = {
  apiKey: "AIzaSyANT6IrKQe5TFLgq4Zd7bExT9ycf7Jqu6s",
  authDomain: "mazinfirbase.firebaseapp.com",
  projectId: "mazinfirbase",
  storageBucket: "mazinfirbase.appspot.com",
  messagingSenderId: "691356417983",
  appId: "1:691356417983:web:5625a146bbd95043d02b0a",
  measurementId: "G-VZJ98QC92V",
};

export const FirestoreContext = createContext();

const FirestoreProvider = ({ children }) => {
  const app = initializeApp(firstorConfig);
  const db = getFirestore(app);

  return (
    <FirestoreContext.Provider value={{ app, db }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
