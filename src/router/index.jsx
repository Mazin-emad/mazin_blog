import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import NotFound from "../components/notFound/NotFound";
import DefaultLayout from "../layouts/mainLayout/DefaultLayout";
import Login from "../components/auth/login";
import AuthLayout from "../layouts/authLayout/authLayout";
import ArticlePage from "../components/articles/articlesPage";
import NewPostPage from "../components/newPost/newPostPage";
import Signup from "../components/auth/signup";
import Article from "../components/TheArticle/Article";
import { useAuth } from "../contexts/authContext";

function MyRouter() {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/articles" element={<DefaultLayout />}>
        <Route index element={<ArticlePage />} />
        {isAuth ? (
          <Route path="new" element={<NewPostPage />} />
        ) : (
          <Route path="new" element={<Navigate to="/login" replace />} />
        )}
        <Route path=":slug" element={<Article />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        {!isAuth ? (
          <Route path="login" element={<Login />} />
        ) : (
          <Route path="login" element={<Navigate to="/" replace />} />
        )}
        {!isAuth ? (
          <Route path="signup" element={<Signup />} />
        ) : (
          <Route path="signup" element={<Navigate to="/" replace />} />
        )}
      </Route>
    </Routes>
  );
}

export default MyRouter;
