import { useEffect, useState } from "react"
import { getArticles } from "../services/api"
import { ArticlesList } from "../components/ArticlesList";


export const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles();
                console.log(articlesData);
                setArticles(articlesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchArticles();

    }, []);

    if (loading) {
        return <p className="loadinng">loading......</p>
    }

    return (
        <section className="articles-container">
            <h2>Articles</h2>
            {articles.length > 0 ? (
                <ArticlesList articles={articles} />
            ) : (
                <p>Not articles found.</p>
            )}
        </section>
    )
}