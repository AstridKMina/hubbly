import styles from './ArticleCard.module.css';

export const ArticleCard = ({ article }) => {
  return (
    <article className={styles.articleCard}>
      <h3 className={styles.articleCardTitle}>{article.title}</h3>
      <img
        src={article.article_img_url}
        alt={`Image for ${article.title}`}
        className={styles.articleCardImage}
      />
      <div className={styles.articleCardContent}>
        <p className={styles.articleCardContentP}>
          <strong>Author:</strong> {article.author}
        </p>
        <p className={styles.articleCardContentP}>
          <strong>Topic:</strong> {article.topic}
        </p>
        <p className={styles.articleCardContentP}>
          <strong>Votes:</strong> {article.votes}
        </p>
        <p className={styles.articleCardContentP}>
          <strong>Comments:</strong> {article.comment_count}
        </p>
      </div>
    </article>
  );
};