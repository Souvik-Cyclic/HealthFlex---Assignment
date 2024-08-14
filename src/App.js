import React, { useState, useEffect } from "react";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import "./App.css";

const App = () => {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : [];
  });

  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  const addReply = (commentId, replyData) => {
    const newReply = {
      id: Date.now(),
      ...replyData,
      date: new Date().toISOString(),
      replies: [],
    };

    setComments((prevComments) => {
      const updateReplies = (comments) => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          } else if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateReplies(comment.replies),
            };
          }
          return comment;
        });
      };

      return updateReplies(prevComments);
    });
  };

  const editComment = (id, newText) => {
    const updateComments = (comments) => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, text: newText };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateComments(comment.replies),
          };
        }
        return comment;
      });
    };
    setComments(updateComments(comments));
  };

  const deleteComment = (commentId, parentId = null) => {
    setComments((prevComments) => {
      const deleteFromComments = (comments) => {
        return comments.filter((comment) => {
          if (comment.id === commentId) {
            return false;
          }
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = deleteFromComments(comment.replies);
          }
          return true;
        });
      };

      if (parentId) {
        return prevComments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: deleteFromComments(comment.replies),
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: deleteFromComments(comment.replies),
            };
          }
          return comment;
        });
      }

      return deleteFromComments(prevComments);
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="app">
      <CommentForm addComment={addComment} />
      <div className="sort-by" onClick={toggleSortOrder}>
        Sort By: Date and Time {sortOrder === "desc" ? "↓" : "↑"}
      </div>
      <CommentList
        comments={sortedComments}
        addReply={addReply}
        editComment={editComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default App;
