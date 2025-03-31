import { useEffect, useState } from "react"
import { getSoloArticle } from "../services/api"
import { useParams } from "react-router-dom";


export const SoloArticlePage = () => {

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {

        const fetchArticle = async (id) => {
            try {
                const articleData = await getSoloArticle(id);
                setArticle(articleData)
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchArticle(id);
    }, [id]);


    if (loading) {
        return <p className="loadinng">loading......</p>
    }


    return (
        <section className="article-container">
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
                        <p className="article-author">By: {article.author}</p>
                        <p><strong>Topic:</strong> {article.topic}</p>
                        <p><strong>Votes:</strong> {article.votes}</p>
                        <p><strong>Comments:</strong> {article.comment_count}</p>
                        <p><strong>Published on:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
                    </div>
           
                <p className="article-body">{article.body}</p>
            </main>
        </section>
    );
};