import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FirestoreProvider from "./contexts/firestoreContext";
import PostsProvider from "./contexts/postsContext";
import AuthProvider from "./contexts/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirestoreProvider>
      <PostsProvider>
        <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </AuthProvider>
      </PostsProvider>
    </FirestoreProvider>
  </React.StrictMode>
);
