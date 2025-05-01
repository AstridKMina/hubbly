import { useContext, useState } from "react";
import { createComment } from "../../services/api";
import { UserContext } from "../../context/UserPageContext";
import { toast } from "react-toastify";
import { ErrorContext } from "../../context/ErrorContext";
import styles from "./CreateArticleComment.module.css";

export const CreateArticleComment = ({ id, comments, setComments, setOptimisticComments }) => {
  const { loggedInUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { error, setErrorMessage } = useContext(ErrorContext);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newComment.trim()) {
      setErrorMessage("Comment can't be empty");
      return;
    }

    try {
      setSubmitting(true);

      if (!loggedInUser || !loggedInUser.username) {
        throw new Error("You must be logged in to comment");
      }

      const comment = await createComment(id, { body: newComment, username: loggedInUser.username });

      setComments((prevComments) => {
        comment.votes = 0;
        return [comment, ...prevComments];
      });

      setOptimisticComments((prevComments) => {
        return [comment, ...prevComments];
      });

      setNewComment("");
      toast.success("Comment created successfully!");
    } catch (error) {
      console.error("Error creating a new comment", error.message);
      setErrorMessage(error.message || "Failed to post comment. Please try again");

      toast.error("Failed to post comment. Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setNewComment(value);

    const regex = /\S/;

    if (!regex.test(value)) {
      setErrorMessage("Comment can't be empty or just spaces");
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmitComment} className={styles.newComment_form}>
      <label htmlFor="newComment" className={styles.srOnly}>
        Add a comment
      </label>
      <textarea
        id="newComment"
        placeholder="Add a comment"
        value={newComment}
        onChange={handleOnChange}
        className={styles.newComment_textarea}
        aria-invalid={!!error}
        aria-describedby={error ? "comment-error" : undefined}
        required
      />
      {error && (
        <p id="comment-error" className={styles.errorMessage}>
          {error}
        </p>
      )}
      <button
        className={styles.newComment_submit_button}
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? "Submitting..." : "Send"}
      </button>
    </form>
  );
};