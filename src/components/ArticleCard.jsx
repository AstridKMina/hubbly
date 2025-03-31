

export const ArticleCard = ({article}) => {
    return (
        <>
          
            <h3>{article.title}</h3>
                    <img
                        src={article.article_img_url}
                        alt={article.title}
                        className="article-card-image"
                    />
                    <div className="article-card-content">
                        <p><strong>Author:</strong> {article.author}</p>
                        <p><strong>Topic:</strong> {article.topic}</p>
                        <p><strong>Votes:</strong> {article.votes}</p>
                        <p><strong>Comments:</strong> {article.comment_count}</p>
                    </div>
                
        </>
    )
}