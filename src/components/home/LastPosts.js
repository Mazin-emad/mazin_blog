import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import PostCard from "../articles/PostCard";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { PostsContext } from "../../contexts/postsContext";

const LastPosts = () => {
  const navigator = useNavigate();

  const { fetch, data, loading, error } = useContext(PostsContext);

  const isMount = useRef(true);
  useEffect(() => {
    if (isMount.current) {
      fetch();
      isMount.current = false;
    }
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Latest Articles</h2>
      <div className="text-center">
        {loading ? (
          <p>
            <Spinner animation="border" /> Loading...
          </p>
        ) : null}
        {error ? (
          <p>
            <Alert variant="danger"> {error}</Alert>
          </p>
        ) : null}
      </div>
      {(!loading || !error) && data && data.length ? (
        <>
          <Row xs="1" md="2" lg="4" className="justify-content-center g-4 mb-4">
            {data.slice(0, 4).map((post) => (
              <Col key={post.id} className="d-grid">
                <PostCard article={post} />
              </Col>
            ))}
          </Row>
          <div className="mt-4 text-center">
            <Button
              className="px-5 fs-5"
              variant="outline-danger"
              onClick={() => navigator("/articles")}
            >
              See More
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center">No Articles to show</p>
      )}
    </Container>
  );
};

export default LastPosts;
