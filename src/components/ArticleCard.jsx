

export const ArticleCard = ({article}) => {
    return (
        <>
            <li key={article.article_id} className="article-item">
            <h3>{article.title}</h3>
                    <img
                        src={article.article_img_url}
                        alt={article.title}
                        className="article-image"
                    />
                    <div className="article-content">
                        <p><strong>Author:</strong> {article.author}</p>
                        <p><strong>Topic:</strong> {article.topic}</p>
                        <p><strong>Votes:</strong> {article.votes}</p>
                        <p><strong>Comments:</strong> {article.comment_count}</p>
                    </div>
                    </li>
        </>
    )
}