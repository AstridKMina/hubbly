import { useContext, useEffect, useState } from "react"
import { ClipLoader } from 'react-spinners';
import { getArticles } from "../services/api"
import { ArticlesList } from "../components/ArticlesList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";
import { ArticlesContext } from "../context/HomeArticlesContext";


export const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort_by, setSort_by] = useState("");
    const [order_by, setOrder_by] = useState("");
    const [selectValue, setSelectValue] = useState("");


    const { error, setErrorMessage } = useContext(ErrorContext);
    const { trendingArticles, setTrendingArticles} = useContext(ArticlesContext)


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
                setArticles(articlesData);
                setTrendingArticles(articlesData)
        console.log("Articles en page:", articlesData);

            } catch (error) {
                console.error('Error fetching articles:', error);
                setErrorMessage(error.message || "Something went wrong!")
            } finally {
                setLoading(false)
            }
        };

        fetchArticles();

    }, [articleTopic, sort_by, order_by]);

 
       
    // useEffect (() => {
    //     console.log(selectValue === "votes", "Valor seleccionado")
    //     console.log("articleTopic dentro del useEffect", !articleTopic)

    //     if(selectValue === "votes" && !articleTopic) {
    //         console.log("dentro del useEffect")
    //         setTrendingArticles(articles.slice(0, 6))
    //         console.log("Trending articles updated:", articles.slice(0, 6));

    //     }        
    // },[articles,selectValue,articleTopic,setTrendingArticles])

    // useEffect(() => {
    //     console.log("Trending articles updated:", trendingArticles);
    // }, [trendingArticles, articles]);

    // if (loading) {
    //     return <ClipLoader color="#36d7b7" size={50} />
    //  }

    const handleSortChange = (e) => {
        let { value, name } = e.target;

        setSelectValue(e.target.value);
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
                    zIndex: 999}}> <ClipLoader  loading={loading}color="#36d7b7" size={90} /> </div>
    ) : (
        <>
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
            </>)}
        </section>
    )
}