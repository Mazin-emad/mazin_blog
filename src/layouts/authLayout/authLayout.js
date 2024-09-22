import React from "react";
import { Alert } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Alert variant="info" className="text-center">
        This section will be completed later.. <br />
        <Link to="../">Go Back</Link>
      </Alert>
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
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
