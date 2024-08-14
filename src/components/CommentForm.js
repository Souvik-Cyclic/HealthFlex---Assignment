import React, { useState } from "react";

const CommentForm = ({
  addComment,
  isReply = false,
  parentId = null,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!text.trim()) {
      alert("Please enter your comment.");
      return;
    }

    if (text.length > 450) {
      alert("Comment cannot exceed 450 characters.");
      return;
    }

    const newComment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toISOString(),
      replies: [],
    };

    if (isReply) {
      addComment(parentId, newComment);
    } else {
      addComment(newComment);
    }

    setName("");
    setText("");

    if (onCancel) onCancel();
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>{isReply ? "Reply" : "Comment"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder={isReply ? "Reply" : "Comment"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength="450"
      />
      <button type="submit">POST</button>
    </form>
  );
};

export default CommentForm;
