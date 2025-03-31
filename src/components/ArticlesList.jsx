import { ArticleCard } from "./ArticleCard"


export const ArticlesList = ({ articles }) => {

    return (
        <>
            <ul>
                {articles.map((article) => (
                    <li key={article.article_id}>
                   <ArticleCard article={article}/>
                </li>
            ))}
            </ul>
        </>
    )
}