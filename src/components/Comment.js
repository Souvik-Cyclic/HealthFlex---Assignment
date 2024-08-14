import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import { formatDate } from "../utils/dateUtils";
import "./Comment.css";

const Comment = ({
  comment,
  editComment,
  deleteComment,
  addReply,
  parentId = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editText, setEditText] = useState(comment.text || "");

  const handleEdit = () => {
    if (editText.length > 450) {
      alert("Comment cannot exceed 450 characters.");
      return;
    }
    editComment(comment.id, editText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteComment(comment.id, parentId);
  };

  const handleReply = (replyData) => {
    addReply(comment.id, replyData);
    setIsReplying(false);
  };

  const formatText = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <h4>{comment.name}</h4>
        <span>{formatDate(comment.date)}</span>
      </div>
      {isEditing ? (
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          maxLength="450"
        />
      ) : (
        <p>{formatText(comment.text)}</p>
      )}
      <div className="comment-actions">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => setIsReplying(true)}>Reply</button>
          </>
        )}
      </div>
      <button
        className={`delete-button ${parentId ? "reply" : "parent"}`}
        onClick={handleDelete}
        title="Delete"
      >
        🗑️
      </button>
      {isReplying && (
        <ReplyForm
          onSubmit={handleReply}
          onCancel={() => setIsReplying(false)}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              editComment={editComment}
              deleteComment={deleteComment}
              addReply={addReply}
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
