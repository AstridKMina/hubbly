import { useEffect, useState } from "react"
import { getArticleComments } from "../services/api"
import { useParams } from "react-router-dom";


export const ArticleCommentsPage = () => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);


    const { id } = useParams();

    useEffect(() => {

        const fetchComments = async () => {
            try {
                const commentsData = await getArticleComments(id);
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchComments();
    }, [id])


    if (loading) {
        return <p className="loadinng">loading......</p>
    }

    return (
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
                        <button className="commment-votes-button">
                            <p>vote up</p>
                        </button>
                        <button className="commment-votes-button">
                            <p>vote down</p>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

