import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

import styled from "styled-components";
import useFetchParam from "../../Hooks/useFitchParam";
import { useParams } from "react-router-dom";
import { getDate } from "../articles/PostCard";
import "./styles.css";
import dummyImg from "../../assets/Mazin_Blog.avif";

const ContBackG = styled.section`
  position: relative;
  background-size: cover;
  background-position: center;
  margin-top: -60px;
  padding: 20px;
  color: white;
  min-height: 100vh;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }
`;

const MyP = styled.p`
  color: #aeaaaa;
`;
const Article = () => {
  const params = useParams();

  const { data, loading, error, getData } = useFetchParam("posts", params.slug);

  const isMount = useRef(false);

  useEffect(() => {
    if (!isMount.current) {
      getData();
      isMount.current = true;
    }
  }, [getData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!data)
    return (
      <Alert variant="info" className="">
        OOPS! No data found... Check the URL or try again later.
      </Alert>
    );

  // const parser = new DOMParser();
  // const parsedHtml = parser.parseFromString(data.body, "text/html");
  // const plainText = parsedHtml.body.textContent || "";

  const myI = data.url || dummyImg;

  return (
    <ContBackG
      style={{
        backgroundImage: `url(${myI})`,
      }}
    >
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <div className="article-content mt-4">
              <h1 className="my-4">{data.title}</h1>
              <div
                className="pb-3 article_body"
                dangerouslySetInnerHTML={{ __html: data.body }}
              ></div>
              <MyP>By: {data.user}</MyP>
              <MyP>Published on: {getDate(data.createdAt)}</MyP>
            </div>
          </Col>
        </Row>
      </Container>
    </ContBackG>
  );
};

export default Article;
