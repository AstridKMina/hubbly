import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { deleteComment, getArticleComments } from "../../services/api"
import { useParams } from "react-router-dom";
import { CreateArticleComment } from "../../components/CreateArticleComment/CreateArticleComment";
import { UserContext } from "../../context/UserPageContext";
import { ErrorContext } from "../../context/ErrorContext";
import styles from "./ArticleCommentsPage.module.css";
import { ClipLoader } from "react-spinners";


export const ArticleCommentsPage = () => {

    const [comments, setComments] = useState([]);
    const [setOptimisticComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    const { loggedInUser } = useContext(UserContext);

    const { setErrorMessage } = useContext(ErrorContext);




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
          {loading ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                zIndex: 999,
              }}
              role="status"
              aria-live="polite"
            >
              <ClipLoader loading={loading} color="#36d7b7" size={90} />
              <span className={styles.srOnly}>Loading comments...</span>
            </div>
          ) : (
            <>
              <section id={styles.newComment} aria-label="Add a comment">
                <CreateArticleComment
                  id={id}
                  comments={comments}
                  setComments={setComments}
                  setOptimisticComments={setOptimisticComments}
                />
              </section>
              <section className={styles.commentsSection} aria-label="Article comments">
                <h2>Comments</h2>
                <ul className={styles.commentsList}>
                  {comments.map((comment) => (
                    <li key={comment.comment_id} className={styles.commentItem}>
                      <div className={styles.commentAuthor}>
                        <img
                          className={styles.commentAvatar}
                          src="https://cdn-icons-png.flaticon.com/256/5953/5953843.png"
                          alt={`${comment.author}'s avatar`}
                        />
                        <div className={styles.commentInfo}>
                          <h3>{comment.author}</h3>
                          <time dateTime={comment.created_at}>
                            {new Date(comment.created_at).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                      <p className={styles.commentBody}>{comment.body}</p>
                      <div className={styles.commentVotes}>
                        <button
                          type="button"
                          className={styles.commentVotes_button}
                          aria-label={`Upvote comment by ${comment.author}`}
                        >
                          <p>👍🏾</p>
                        </button>
                        <p>Votes: {comment.votes}</p>
                        <button
                          type="button"
                          className={styles.commentVotes_button}
                          aria-label={`Downvote comment by ${comment.author}`}
                        >
                          <p>👎🏾</p>
                        </button>
                      </div>
                      {loggedInUser && loggedInUser.username === comment.author && (
                        <button
                          type="button"
                          className={styles.commentDelete_button}
                          onClick={() => handleDelete(comment.comment_id)}
                          disabled={deletingCommentId === comment.comment_id}
                          aria-label={`Delete comment by ${comment.author}`}
                          aria-busy={deletingCommentId === comment.comment_id}
                        >
                          {deletingCommentId === comment.comment_id
                            ? 'Deleting...'
                            : 'Delete ☠️'}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </>
      );
};

