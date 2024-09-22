import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import styles from "./styles.module.css";

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 0;
  display: block;
`;
const linkSpan = styled.span`
  display: block;
`;

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // User is scrolling down
        setShowNavbar(false);
      } else {
        // User is scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    if (lastScrollY < 60) setShowNavbar(true);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className={"fixed-top"}
        style={{
          transition: "top 0.3s",
          top: showNavbar ? "0" : "-76px",
        }}
      >
        <Container>
          <Navbar.Brand as="span">
            <NavLink to="/">
              <LogoImg src={logo} alt="logo" />
            </NavLink>
          </Navbar.Brand>

          <Nav className={`ms-auto ${styles.header_spans}`}>
            <Nav.Link as={linkSpan}>
              <NavLink to="/articles" end>
                Articles
              </NavLink>
            </Nav.Link>
            <Nav.Link as={linkSpan}>
              <NavLink to="/login">Login</NavLink>
            </Nav.Link>
            <Nav.Link as={linkSpan}>
              <NavLink to="/articles/new">New Post</NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
