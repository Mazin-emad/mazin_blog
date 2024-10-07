import React, { useContext, useEffect, useRef } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import PostCard from "./PostCard";
import { PostsContext } from "../../contexts/postsContext";

const ArticlePage = () => {
  const { data, loading, error, fetch, fetching, fetchNext } =
    useContext(PostsContext);

  const isMount = useRef(false);
  const blogObserverRef = useRef(null);

  useEffect(() => {
    if (!isMount.current) {
      fetch();
      isMount.current = true;
    }
  }, [fetch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNext();
        }
      },
      { rootMargin: "0px 0px 300px 0px" }
    );

    const currentRef = blogObserverRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [blogObserverRef, data, fetchNext]);

  return (
    <Container className="py-5">
      <h2 className="text-center pb-4">Articles</h2>

      <div className="text-center">
        {loading ? (
          <div>
            <Spinner animation="border" />
            Loading...
          </div>
        ) : error ? (
          <p>
            <Alert variant="danger"> {error} </Alert>
          </p>
        ) : null}
      </div>

      {(!loading || !error) && data ? (
        <Row xs="1" md="2" lg="4" className="g-4">
          {data.map((article) => (
            <Col key={article.id} className="d-grid">
              <PostCard article={article} />
            </Col>
          ))}
          {fetching ? (
            <div className="text-center">
              <Spinner animation="border" />
              Fetching...
            </div>
          ) : null}
        </Row>
      ) : null}
      <div ref={blogObserverRef} className="ref"></div>
    </Container>
  );
};

export default ArticlePage;
