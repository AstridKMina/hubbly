import { useContext, useState } from "react";
import { createArticle } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserPageContext";
import { ErrorContext } from "../../context/ErrorContext";
import { ArticlesContext } from "../../context/HomeArticlesContext";
import styles from "./NewArticle.module.css";

export const NewArticle = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);


    const { loggedInUser } = useContext(UserContext);
    const { error, setErrorMessage } = useContext(ErrorContext);
    const { trendingArticles, setTrendingArticles, topicsList, setTopicsList } = useContext(ArticlesContext);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        if (!body.trim()) {
            setErrorMessage("article body can't be empty");
            return;
        }

        try {

            if (!loggedInUser || !loggedInUser.username) {
                throw new Error("You must be logged in to create an article.");
            }

            const newArticle = { author: loggedInUser.username, title, body, topic };
            const response = await createArticle(newArticle);
            console.log(response, "a ver si yenemos un nuevo articulo")
            navigate(`/articles/${response.article_id}`);

            setTrendingArticles((prevComments) => {
                return[newArticle, ...prevComments]
            });

    } catch (err) {
        setErrorMessage(err.message || "Error creating article");
    } finally {
        setLoading(false);
    }
};


return (
    <main className={styles.newArticleContainer}>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            zIndex: 999
          }}
        >
          <ClipLoader loading={loading} color="#36d7b7" size={90} />
        </div>
      ) : (
        <form className={styles.newArticleForm} onSubmit={handleSubmit}>
          <h2>Create New Article</h2>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="">Select a topic</option>
            {topicsList.map((topic) => (
              <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
            ))}
          </select>

          <label>
            Body:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Submit"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </main>
  );
};