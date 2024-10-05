import React from "react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <nav className="d-flex justify-content-center py-4 align-items-center bg-dark">
        <Link className="text-light text-decoration-none fw-bold" to="../">Go Back</Link>
      </nav>
      <main className="d-flex justify-content-center align-items-center m-0">
        <div className="w-100">
          <Outlet />
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-3">
        <p>
          © 2024 <span className="text-danger">Mazin</span> Blog
        </p>
      </footer>
    </>
  );
};

export default AuthLayout;
