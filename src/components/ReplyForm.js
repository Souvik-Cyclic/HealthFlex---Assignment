import React, { useState } from "react";

const ReplyForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !text.trim()) {
      alert("Both name and reply text are required.");
      return;
    }
    onSubmit({ name, text });
    setName("");
    setText("");
  };

  return (
    <div className="reply-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength="50"
      />
      <textarea
        placeholder="Reply"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength="450"
      />
      <div className="reply-form-actions">
        <button onClick={handleSubmit}>Reply</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ReplyForm;
