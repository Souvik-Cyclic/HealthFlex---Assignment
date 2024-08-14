import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, addReply, editComment, deleteComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          editComment={editComment}
          deleteComment={deleteComment}
          addReply={addReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
