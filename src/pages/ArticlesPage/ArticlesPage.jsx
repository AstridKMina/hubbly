import { useState } from "react"
import { ClipLoader } from 'react-spinners';
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import styles from "./ArticlesPage.module.css";

export const ArticlesPage = ({order_by, sort_by, articleTopic, setOrder_by,setSort_by, articles, loading, setSearchParams}) => {


    const [selectValue, setSelectValue] = useState("");
    const validSortColumns = ["Date", "votes", "Comment count"];
    const validOrderValues = ["ASC", "DESC"];


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


    console.log("articles:", articles.length)

    return (
        <section className={styles.articlesContainer}>
            {loading ? (
                <div className={styles.loadingWrapper}>
                    <ClipLoader loading={loading} color="#36d7b7" size={90} />
                </div>
            ) : (
                <>
                    <h2>Articles</h2>

                    <div className="selectDiv">
                        <select name="sort_by" id="sort-by-select" onChange={handleSortChange} value={sort_by}>
                            <option value="">Sort by</option>
                            {validSortColumns.map((sortType) => (
                                <option value={sortType} key={sortType}>
                                    {sortType}
                                </option>
                            ))}
                        </select>

                        <select name="order" id="order-select" onChange={handleSortChange} value={order_by}>
                            <option value="">Order by</option>
                            {validOrderValues.map((orderValue) => (
                                <option value={orderValue} key={orderValue}>
                                    {orderValue}
                                </option>
                            ))}
                        </select>
                    </div>

                    {articles.length > 0 ? (
                        <ArticlesList articles={articles} />
                    ) : (
                        <p className={styles.noArticlesFound}>No articles found.</p>
                    )}
                </>
            )}
        </section>
    );
};