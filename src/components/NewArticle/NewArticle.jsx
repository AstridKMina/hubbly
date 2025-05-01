import { useContext, useState } from 'react';
import { createArticle } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserPageContext';
import { ErrorContext } from '../../context/ErrorContext';
import { ArticlesContext } from '../../context/HomeArticlesContext';
import styles from './NewArticle.module.css';

export const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const { loggedInUser } = useContext(UserContext);
  const { error, setErrorMessage } = useContext(ErrorContext);
  const { setTrendingArticles, topicsList } = useContext(ArticlesContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!body.trim()) {
      setErrorMessage("Article body can't be empty");
      setLoading(false);
      return;
    }

    try {
      if (!loggedInUser || !loggedInUser.username) {
        throw new Error('You must be logged in to create an article.');
      }

      const newArticle = { author: loggedInUser.username, title, body, topic };
      const response = await createArticle(newArticle);
      navigate(`/articles/${response.article_id}`);

      setTrendingArticles((prevComments) => {
        return [newArticle, ...prevComments];
      });
    } catch (err) {
      setErrorMessage(err.message || 'Error creating article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.newArticleContainer}>
      {loading ? (
        <div
          className={styles.loadingOverlay}
          role="status"
          aria-live="polite"
        >
          <ClipLoader loading={loading} color="#36d7b7" size={90} />
          <span className={styles.srOnly}>Loading...</span>
        </div>
      ) : (
        <form className={styles.newArticleForm} onSubmit={handleSubmit}>
          <h1>Create New Article</h1>
          <label htmlFor="title">
            Title:
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby={error ? 'article-error' : undefined}
            />
          </label>
          <label htmlFor="topic">
            Topic:
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby={error ? 'article-error' : undefined}
            >
              <option value="">Select a topic</option>
              {topicsList.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="body">
            Body:
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby={error ? 'article-error' : undefined}
            />
          </label>
          <button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Creating...' : 'Submit'}
          </button>
          {error && (
            <p id="article-error" className={styles.error}>
              {error}
            </p>
          )}
        </form>
      )}
    </main>
  );
};