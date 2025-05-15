import React from "react";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div bg="dark" className="w-100 bg-dark position-absolute">
      <p className="m-0 text-center text-white py-3">
        By @
        <span className="text-danger">
          <a href="https://github.com/Mazin-emad">Mazin Emad</a>
        </span>{" "}
        ©{year}
      </p>
    </div>
  );
};

export default Footer;
