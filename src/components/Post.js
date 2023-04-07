import React from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";

const Post = (props) => {
  const deletePostHandler = () => {
    props.onDelete(props.post[0]);
  };

  return (
    <div className="posts-container">
      <p style={{ marginBottom: "2px" }}>
        {moment(props.post[1].date).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <h3>{props.post[1].title}</h3>
      <p>{props.post[1].body}</p>
      <Button variant="secondary" onClick={deletePostHandler}>
        Delete this post
      </Button>
    </div>
  );
};

export default Post;
