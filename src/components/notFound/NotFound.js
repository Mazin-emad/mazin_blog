import React from "react";
import notFoundImage from "../../assets/not-found.png";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="mx-auto d-flex py-5 justify-content-center align-items-center flex-column">
      <img className="not_found_img" src={notFoundImage} alt="Not Found" />
      <h3 className="not_found_h3">Not Found</h3>
    </Container>
  );
};

export default NotFound;
