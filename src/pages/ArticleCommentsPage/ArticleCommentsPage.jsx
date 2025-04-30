import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { deleteComment, getArticleComments } from "../../services/api"
import { useParams } from "react-router-dom";
import { CreateArticleComment } from "../../components/CreateArticleComment/CreateArticleComment";
import { UserContext } from "../../context/UserPageContext";
import { ErrorContext } from "../../context/ErrorContext";
import styles from "./ArticleCommentsPage.module.css";


export const ArticleCommentsPage = () => {

    const [comments, setComments] = useState([]);
    const [optimisticComments, setOptimisticComments] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    const {error,setErrorMessage} = useContext(ErrorContext);
    



    const { id } = useParams();

    useEffect(() => {

        const fetchComments = async () => {
            try {
                const commentsData = await getArticleComments(id);
                setComments(commentsData);
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        }
        fetchComments();
    }, [id])


    if (loading) {
        return <p className="loading">loading comments......</p>
    }


    const handleDelete = async (comment_id) => {
        setDeletingCommentId(comment_id);
        try {
            await deleteComment(comment_id);

            setComments((prevComments) =>
                prevComments.filter((comment) => comment.comment_id !== comment_id)
            );

            setOptimisticComments((prevComments) =>
                prevComments.filter((comment) => comment.comment_id !== comment_id)
            );
 toast.success("Comment deleted successfully!");
        } catch (error) {
            console.error("The comment has not been deleted", error.message);
            setErrorMessage(error.message || "Something went wrong!");
        } finally {
            setDeletingCommentId(null);
        }
    };

    return (
        <>
            <section id={styles.newComment}>
                <CreateArticleComment id={id} comments={comments} setComments={setComments} setOptimisticComments={setOptimisticComments} />
            </section>
            <section className={styles.commentsSection}>
                <h2>Comments</h2>
                <ul className={styles.commentsList}>
                    {comments.map((comment) => (
                        <li key={comment.comment_id} className={styles.commentItem}>
                            <div className={styles.commentAuthor}>
                                <img
                                    className={styles.commentAvatar}
                                    src="https://cdn-icons-png.flaticon.com/256/5953/5953843.png"
                                    alt="User avatar"
                                />
                                <div>
                                    <h4>{comment.author}</h4>
                                    <time>{new Date(comment.created_at).toLocaleDateString()}</time>
                                </div>
                            </div>
                            <p className={styles.commentBody}>{comment.body}</p>
                            <div className={styles.commentVotes}>
                                <button className={styles.commentVotes_button}>
                                    <p>👍🏾</p>
                                </button>
                                <p>Votes: {comment.votes}</p>
                                <button className={styles.commentVotes_button}>
                                    <p>👎🏾</p>
                                </button>
                            </div>
                            {loggedInUser && loggedInUser.username === comment.author && (
                            <button
                                className={styles.commentDelete_button}
                                onClick={() => handleDelete(comment.comment_id)}
                                disabled={deletingCommentId === comment.comment_id}
                            >
                                {deletingCommentId === comment.comment_id ? "Deleting..." : "Delete ☠️"}
                            </button>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

