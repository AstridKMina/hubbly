import { useContext, useEffect, useState } from "react"
import { ClipLoader } from 'react-spinners';
import { getUser } from "../../services/api";
import { ErrorContext } from "../../context/ErrorContext";
import { UserContext } from "../../context/UserPageContext";
import { Link, useParams } from "react-router-dom";
import styles from "./UsersPage.module.css";

export const UserPage = ({articles}) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [userArticles, setUserArticles] = useState([]);

    const { error, setErrorMessage } = useContext(ErrorContext);


    const { loggedInUser} = useContext(UserContext);


    const { username } = useParams();

    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true)
            try {
                const userData = await getUser(username);
                setUser(userData[0]);
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong!")
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [username]);


    useEffect(() => {
        if (loggedInUser && user.username) {
            const userPosts = articles.filter(
                (article) => article.author === user.username
            );
            setUserArticles(userPosts);
        } else {
            setUserArticles([]);
        }
    }, [user,loggedInUser]);


    return (
      <article
        className={styles.userPageArticule}
        aria-label={`Profile for ${user.username}`}
      >
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
              zIndex: 999,
            }}
            role="status"
            aria-live="polite"
          >
            <ClipLoader loading={loading} color="#36d7b7" size={90} />
            <span className={styles.srOnly}>Loading user profile...</span>
          </div>
        ) : (
          <>
            <section className={styles.userPage} aria-label="User profile details">
              <header className={styles.userPageHeader}>
                <h1 className={styles.userPageH1}>
                  {user.name || 'Name not found'}
                </h1>
                <p className={styles.userPageP}>@{user.username}</p>
              </header>
    
              <figure className={styles.userPageFigure}>
                <img
                  src={user.avatar_url}
                  alt={`Avatar for ${user.name || user.username}`}
                  className={styles.userPageImg}
                />
                <figcaption className={styles.userPageFigcaption}>
                  Profile Picture
                </figcaption>
              </figure>
            </section>
            <section
              className={styles.userArticles}
              aria-label={`Articles by ${user.username}`}
            >
              <h2 className={styles.userArticlesH2}>
                Articles by {user.username}
              </h2>
              {userArticles.length > 0 ? (
                <ul className={styles.userCardUl}>
                  {userArticles.map((article) => (
                    <li
                      key={article.article_id}
                      className={styles.userArticleCard}
                    >
                      <Link
                        to={`/articles/${article.article_id}`}
                        aria-label={`Read article: ${article.title}`}
                      >
                        <img
                          src={article.article_img_url}
                          alt={`Image for ${article.title}`}
                          className={styles.userArticleCardImg}
                        />
                        <h3 className={styles.userArticleCardH3}>
                          {article.title}
                        </h3>
                        <p className={styles.userArticleCardP}>
                          <strong>Topic:</strong> {article.topic}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p id="no-articles">This user hasn’t posted any articles yet.</p>
              )}
            </section>
          </>
        )}
      </article>
    );
};
