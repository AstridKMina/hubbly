import { useContext, useEffect, useState } from "react"
import { getSoloArticle, updateArticleVotes } from "../services/api"
import { useParams } from "react-router-dom";
import { ArticleCommentsPage } from "./ArticleCommentsPage";
import { CreateArticleComment } from "../components/CreateArticleComment";
import { ErrorContext } from "../context/ErrorContext";


export const SoloArticlePage = () => {

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [optimisticVotes, setOptimisticVotes] = useState(0);
// const [error, setError] = useState(null)

const {error,setErrorMessage} = useContext(ErrorContext);
   
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


    if (loading) {
        return <p className="loadinng">loading......</p>
    }


    const handleVotes = async (increment=true) => {

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
        <article className="article-container">
            <header className="article-header">
                <h1>{article.title}</h1>
            </header>

            <main className="article-content">
                <img
                    src={article.article_img_url}
                    alt={article.title}
                    className="article-image"
                />
                <div className="article-meta">
                    <p className="article-author"><strong>By:</strong> {article.author}</p>
                    <div className="article-votes">
                        <button onClick={() => handleVotes(true)} className="article-votes-button" >
                            <p>👍🏾</p>
                        </button>
                        <p><strong>Votes:</strong> {optimisticVotes}</p>
                        <button onClick={() => handleVotes(false)} className="article-votes-button">
                            <p>👎🏾</p>
                        </button>
                    </div>
                    <p><strong>Comments:</strong> {article.comment_count}</p>
                    <p><strong>Published on:</strong> <time>{new Date(article.created_at).toLocaleDateString()}</time></p>
                </div>
                <p className="article-body">{article.body}</p>
               
                <ArticleCommentsPage />
            </main>

            <footer className="article-footer">
                <p>End of the article</p>
            </footer>
        </article>
    );
};