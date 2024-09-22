import React, { useContext, useState } from "react";
import Editor from "./editor";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FirestoreContext } from "../../contexts/firestoreContext";
import { PostsContext } from "../../contexts/postsContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const { db } = useContext(FirestoreContext);
  const { refetch } = useContext(PostsContext);

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const url = e.target.url.value;
    const excert = e.target.excert.value;
    const slug = title.split(" ").join("-") + "-" + new Date().getTime();

    try {
      const colRef = collection(db, "posts");

      setLoading(true);

      await addDoc(colRef, {
        title,
        excert,
        body,
        url,
        slug,
        user: "mazin",
        createdAt: serverTimestamp(),
      });
      setBody("");
      e.target.reset();

      refetch();
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
    navigate("/articles/" + slug);
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md="8" lg="6" className="mx-auto">
            <h2 className="mb-4">Add New Post</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  name="title"
                  placeholder="Enter Title"
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="excert" className="mb-3">
                <Form.Label>Post Excert</Form.Label>
                <Form.Control
                  name="excert"
                  placeholder="Enter post excert"
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="url" className="mb-3">
                <Form.Label>
                  {"Image URL (Let it emtey if You have no URL)"}
                </Form.Label>
                <Form.Control
                  name="url"
                  placeholder="Enter image url"
                  type="text"
                />
              </Form.Group>
              <Editor value={body} onChange={setBody} />
              <Button variant="danger" type="submit" className="mt-4 w-100">
                Submit {loading && "..."}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewPostPage;
