import { useContext, useEffect, useState } from "react"
import { ClipLoader } from 'react-spinners';
import { getSoloArticle, updateArticleVotes } from "../../services/api"
import { useParams } from "react-router-dom";
import { ArticleCommentsPage } from "../ArticleCommentsPage/ArticleCommentsPage";
import { CreateArticleComment } from "../../components/CreateArticleComment/CreateArticleComment";
import { ErrorContext } from "../../context/ErrorContext";
import styles  from "./SoloArticlePage.module.css";


export const SoloArticlePage = () => {

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [optimisticVotes, setOptimisticVotes] = useState(0);


    const { error, setErrorMessage } = useContext(ErrorContext);

    const { id } = useParams();

    useEffect(() => {

        const fetchArticle = async (id) => {
            try {
                const articleData = await getSoloArticle(id);
                setArticle(articleData)
                setOptimisticVotes(articleData.votes)
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong!");
            } finally {
                setLoading(false)
            }
        }
        fetchArticle(id);
    }, [id]);


    // if (loading) {
    //     return <p className="loadinng">loading......</p>
    // }

    // Mirar si nos sirve de algo el useRef

    const handleVotes = async (increment = true) => {

        const vote = increment ? +1 : -1

        setOptimisticVotes(prevVotes => prevVotes + vote)

        try {
            const updatedArticle = await updateArticleVotes(id, vote);
            setOptimisticVotes(updatedArticle.votes);
        } catch (err) {
            console.error("Error updating votes:", error.message);
            setOptimisticVotes(prevVotes => prevVotes - vote);
            setErrorMessage(error.message || "Something went wrong!")
        }

        return error
    }


    return (
        <article className={styles.articleContainer}>
            {loading ? (
                < div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    zIndex: 999
                }}> <ClipLoader loading={loading} color="#36d7b7" size={90} /> </div>
            ) : (
                <>
                    <header className={styles.articleHeader}>
                        <h1>{article.title}</h1>
                    </header>

                    <main className={styles.articleContent}>
                        <img
                            src={article.article_img_url}
                            alt={article.title}
                            className={styles.articleImage}
                        />
                        <div className={styles.articleMeta}>
                            <p className={styles.articleAuthor}><strong>By:</strong> {article.author}</p>
                            <div className={styles.articleVotes}>
                                <button onClick={() => handleVotes(true)} className={styles.articleVotes_button} >
                                    <p>👍🏾</p>
                                </button>
                                <p><strong>Votes:</strong> {optimisticVotes}</p>
                                <button onClick={() => handleVotes(false)} className={styles.articleVotes_button}>
                                    <p>👎🏾</p>
                                </button>
                            </div>
                            <p><strong>Comments:</strong> {article.comment_count}</p>
                            <p><strong>Published on:</strong> <time>{new Date(article.created_at).toLocaleDateString()}</time></p>
                        </div>
                        <p className={styles.articleBody}>{article.body}</p>
                        <ArticleCommentsPage />
                    </main>
                </>
            )}
        </article>
    );
};