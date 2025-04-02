import { useEffect, useState } from "react"
import { getArticles } from "../services/api"
import { ArticlesList } from "../components/ArticlesList";
import { useSearchParams } from "react-router-dom";


export const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams()

const articleTopic = searchParams.get("topic");

console.log(articleTopic, "a ver ese topic")

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles(articleTopic);
                console.log(articlesData);
                setArticles(articlesData)
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchArticles();

    }, [articleTopic]);

    if (loading) {
        return <p>loading......</p>
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