import { useContext, useEffect, useState } from "react"
import { getArticles } from "../services/api"
import { ArticlesList } from "../components/ArticlesList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";


export const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort_by, setSort_by] = useState("")
    const [order_by, setOrder_by] = useState("")


    const { error, setErrorMessage } = useContext(ErrorContext);


    const [searchParams, setSearchParams] = useSearchParams()

    const articleTopic = searchParams.get("topic");



    const validSortColumns = ["Date", "votes", "Comment count"];
    const validOrderValues = ["ASC", "DESC"];


    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setErrorMessage(null);

            try {
                const articlesData = await getArticles(sort_by, order_by, articleTopic);
                setArticles(articlesData)
            } catch (error) {
                console.error('Error fetching articles:', error);
                setErrorMessage(error.message || "Something went wrong!")
            } finally {
                setLoading(false)
            }
        };

        fetchArticles();

    }, [articleTopic, sort_by, order_by]);


    if (loading) {
        return <p>loading articles......</p>
    }

    const handleSortChange = (e) => {
        let { value, name } = e.target;


        setSearchParams((prevParams) => {
            const updatedParams = new URLSearchParams(prevParams);
            
            if (name === "sort_by") {
                if (value === "Date") value = "created_at";
                if (value === "Comment count") value = "comment_count";
                updatedParams.set("sort_by", value);
            }

            if (name === "order") {
                updatedParams.set("order", value);
            }

            if (articleTopic) {
                updatedParams.set("topic", articleTopic);
            }

            return updatedParams;
        });


        if (name === "sort_by") {
            setSort_by(value);
        }
        if (name === "order") {
            setOrder_by(value);
        }
    };



    return (
        <section className="articles-container">
            <h2>Articles</h2>

            <select name="sort_by" id="sort-by-select" onChange={handleSortChange}
                value={sort_by}
            >
                <option value="">Sort by</option>
                {validSortColumns.map((sortType) => (
                    <option value={sortType} key={sortType}>{sortType}</option>
                ))}
            </select>

            <select name="order" id="order-select" onChange={handleSortChange}
                value={order_by}
            >
                <option value="">Order by</option>
                {validOrderValues.map((orderValue) => (
                    <option value={orderValue} key={orderValue}>{orderValue}</option>
                ))}
            </select>
            {articles.length > 0 ? (
                <ArticlesList articles={articles} />
            ) : (
                <p>Not articles found.</p>
            )}
        </section>
    )
}