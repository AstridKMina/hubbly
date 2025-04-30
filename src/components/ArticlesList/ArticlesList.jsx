import { useNavigate } from "react-router-dom"
import { ArticleCard } from "../ArticleCard/ArticleCard"
import styles from "./ArticlesList.module.css";


export const ArticlesList = ({ articles }) => {

    const navigate = useNavigate();

    return (
        <>
            <ul>
                {articles.map((article) => (
                    <li className={styles.articlesList} key={article.article_id} onClick={() => navigate(`/articles/${article.article_id}`) }>
                        <ArticleCard article={article} />
                    </li>
                ))}
            </ul>
        </>
    )
}