import styles from "./home.module.css";
import picture from "../../assets/logo.png";
import { Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const Cont = styled.div`
  align-items: center;
  justify-content: center;
  height: auto;
  text-align: center;
  flex-direction: column;
  display: flex;
`;

const Hero = () => {
  const {  isAuth,displayName } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="py-5 bg-light">
      <Container as={Cont}>
        <img src={picture} alt="Blog logo" className={styles.hero_img} />

        <p className="fs-5 d-block col-12 col-md-10 col-lg-9 ">
          <span className="d-block">Welcome <span className="text-danger">{displayName}</span> to my Blog!</span>
          I'm<span className="text-danger"> Mazin Emad </span>a web
          developer and this is my blog app built with React and Firebase...
          will be adding more features soon. And to be honest, I'm not a
          designer, so please don't judge me by the design of this app.
        </p>

        <Button
          variant="danger"
          size="lg"
          className="mt-4"
          onClick={() => navigate("articles/new")}
        >
          {!isAuth ? "LogIn to post" : "Add New Article"}
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
