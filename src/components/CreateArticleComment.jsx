import { useContext, useState } from "react";
import { createComment } from "../services/api";
import { UserContext } from "../context/UserPageContext";
import { toast } from "react-toastify";

export const CreateArticleComment = ({ id, comments, setComments, setOptimisticComments }) => {
    const { loggedInUser } = useContext(UserContext);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setError(null);

        if (!newComment.trim()) {
            setError("Comment can't be empty");
            return;
        }

        try {
            setSubmitting(true);

            if (!loggedInUser || !loggedInUser.username) {
                throw new Error("You must be logged in to comment");
            }

            const comment = await createComment(id, { body: newComment, username: loggedInUser.username });

            setComments((prevComments) => {
                return [comment, ...prevComments];
            });

            setOptimisticComments((prevComments) => {
                return [comment, ...prevComments];
            });

            setNewComment("");
            toast.success("Comment created successfully!");
        } catch (error) {
            console.error("Error creating a new comment", error.message);
            setError(error.message || "Failed to post comment. Please try again");

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
            setError("Comment can't be empty or just spaces");
        } else {
            setError(null);
        }
    };

    return (
        <form onSubmit={handleSubmitComment} className="new-comment-form">
            <textarea
                id="new-comment-textarea"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => handleOnChange(e)}
            />
            {error && <p style={{ color: "red" }}> {error}</p>}
            <button
                className="new-comment-submit-button"
                type="submit"
                disabled={submitting} 
            >
                Submit
            </button>
        </form>
    );
};