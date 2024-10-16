import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FirestoreContext } from "../../contexts/firestoreContext";
import { PostsContext } from "../../contexts/postsContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../contexts/authContext";

const NewPostPage = () => {
  const { db } = useContext(FirestoreContext);
  const { refetch } = useContext(PostsContext);
  const { displayName } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      excert: "",
      url: "",
      body: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().min(3).max(35).required(),
      excert: Yup.string().min(17).required(),
      url: Yup.string().url("this must be a valid URL"),
      body: Yup.string().min(50).required(),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        const title = values.title;
        const excert = values.excert;
        const url = values.url;
        const body = values.body;
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
            user: displayName,
            createdAt: serverTimestamp(),
          });
          formik.resetForm();
          refetch();
        } catch (err) {
          console.log(err.message);
        }
        setLoading(false);
        navigate("/articles/" + slug);
      }
    },
  });
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md="8" lg="6" className="mx-auto">
            <h2 className="mb-4">Add New Post</h2>
            <Form onSubmit={formik.handleSubmit}>
              {/* title */}
              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  name="title"
                  placeholder="Enter Title"
                  type="text"
                  isInvalid={formik.errors.title && formik.touched.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title ? (
                  <Form.Text className="text-danger">
                    {formik.errors.title}
                  </Form.Text>
                ) : null}
              </Form.Group>

              {/* excert */}
              <Form.Group controlId="excert" className="mb-3">
                <Form.Label>Post Excert</Form.Label>
                <Form.Control
                  name="excert"
                  placeholder="Enter post excert"
                  type="text"
                  isInvalid={formik.errors.excert && formik.touched.excert}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.excert && formik.touched.excert ? (
                  <Form.Text className="text-danger">
                    {formik.errors.excert}
                  </Form.Text>
                ) : null}
              </Form.Group>

              {/* url  */}
              <Form.Group controlId="url" className="mb-3">
                <Form.Label>
                  {"Image URL (Let it empty if You have no URL)"}
                </Form.Label>
                <Form.Control
                  name="url"
                  placeholder="Enter image url"
                  type="text"
                  isInvalid={formik.errors.url && formik.touched.url}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.url && formik.touched.url ? (
                  <Form.Text className="text-danger">
                    {formik.errors.url}
                  </Form.Text>
                ) : null}
              </Form.Group>

              <ReactQuill
                theme="snow"
                onBlur={() => formik.setFieldTouched("body", true)}
                onChange={(content) => formik.setFieldValue("body", content)}
              />
              {formik.errors.body && formik.touched.body ? (
                <Form.Text className="text-danger">
                  {formik.errors.body}
                </Form.Text>
              ) : null}
              <Button
                variant="danger"
                type="submit"
                className={`mt-4 w-100 ${loading ? "disabled" : ""}`}
              >
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
