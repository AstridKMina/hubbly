import { useContext, useEffect, useState } from "react"
import { deleteComment, getArticleComments } from "../services/api"
import { useParams } from "react-router-dom";
import { CreateArticleComment } from "../components/CreateArticleComment";
import { UserContext } from "../context/UserPageContext";
import { ErrorContext } from "../context/ErrorContext";


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

        } catch (error) {
            console.error("The comment has not been deleted", error.message);
            setErrorMessage(error.message || "Something went wrong!");
        } finally {
            setDeletingCommentId(null);
        }
    };

    return (
        <>
            <section id="new-comment">
                <CreateArticleComment id={id} comments={comments} setComments={setComments} setOptimisticComments={setOptimisticComments} />
            </section>
            <section className="comments-section">
                <h2>Comments</h2>
                <ul className="comments-list">
                    {comments.map((comment) => (
                        <li key={comment.comment_id} className="comment-item">
                            <div className="comment-author">
                                <img
                                    className="comment-avatar"
                                    src="https://cdn-icons-png.flaticon.com/256/5953/5953843.png"
                                    alt="User avatar"
                                />
                                <div>
                                    <h4>{comment.author}</h4>
                                    <time>{new Date(comment.created_at).toLocaleDateString()}</time>
                                </div>
                            </div>
                            <p className="comment-body">{comment.body}</p>
                            <div className="comment-votes">
                                <button className="comment-votes-button">
                                    <p>👍🏾</p>
                                </button>
                                <p>Votes: {comment.votes}</p>
                                <button className="comment-votes-button">
                                    <p>👎🏾</p>
                                </button>
                            </div>
                            {loggedInUser && loggedInUser.username === comment.author && (
                            <button
                                className="comment-delete-button"
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

