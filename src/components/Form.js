import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";

const Form = (props) => {
  const [emptyInputField, setEmptyInputField] = useState(false);
  const [emptyTextAreaField, setEmptyTextAreaField] = useState(false);

  const titleInputRef = useRef();
  const postTextAreaInputRef = useRef();

  const validateInput = () => {
    let valid = true;

    if (titleInputRef.current.value.trim().length === 0) {
      setEmptyInputField(true);
      valid = false;
    }

    if (postTextAreaInputRef.current.value.trim().length === 0) {
      setEmptyTextAreaField(true);
      valid = false;
    }

    return valid;
  };

  const submitHandler = () => {
    if (validateInput()) {
      props.onNewPostSubmit(
        titleInputRef.current.value,
        postTextAreaInputRef.current.value
      );

      titleInputRef.current.value = "";
      postTextAreaInputRef.current.value = "";
    }
  };

  return (
    <div className="form-post">
      <h2>New Post:</h2>
      <input
        className={`form-control ${!emptyInputField ? "" : "empty"}`}
        type="text"
        id="title"
        placeholder="Please enter the post title..."
        ref={titleInputRef}
        onFocus={() => setEmptyInputField(false)}
      />
      <textarea
        className={`form-control ${!emptyTextAreaField ? "" : "empty"}`}
        rows="4"
        cols="50"
        placeholder="Please enter your post text..."
        ref={postTextAreaInputRef}
        onFocus={() => setEmptyTextAreaField(false)}
      ></textarea>
      <br />
      <Button variant="primary" onClick={submitHandler}>
        Submit
      </Button>
    </div>
  );
};

export default Form;
