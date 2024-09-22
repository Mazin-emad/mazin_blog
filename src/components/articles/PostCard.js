import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styles from "./styles.module.css";
import dummyImg from "../../assets/Mazin_Blog.avif";

export const getDate = (d) => {
  const date = new Date(d);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const PostCard = ({ article }) => {
  if (!article) return null;

  return (
    <Card className={styles.card_wrapper}>
      <Link to={"/articles/" + article.slug} className={styles.card_link}>
        <div className={styles.card_img_cont}>
          <Card.Img
            variant="top"
            src={article.url || dummyImg}
            className={styles.card_img}
          />
          <div className={styles.img_info}>
            <small>by: {article.user}</small>
            <small>{getDate(article.createdAt)}</small>
          </div>
        </div>
        <Card.Body className={styles.excert}>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.excert}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default PostCard;
