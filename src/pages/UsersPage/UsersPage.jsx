import { useContext, useEffect, useState } from "react"
import { ClipLoader } from 'react-spinners';
import { getUser } from "../../services/api";
import { UsersList } from "../../components/UsersList";
import { ErrorContext } from "../../context/ErrorContext";
import { UserContext } from "../../context/UserPageContext";
import { Link, useParams } from "react-router-dom";
import { ArticlesContext } from "../../context/HomeArticlesContext";
import styles from "./UsersPage.module.css";

export const UserPage = ({articles}) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [userArticles, setUserArticles] = useState([]);

    const { error, setErrorMessage } = useContext(ErrorContext);


    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    // const { trendingArticles, setTrendingArticles, topicsList, setTopicsList } = useContext(ArticlesContext);


    const { username } = useParams();

    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true)
            try {
                const userData = await getUser(username);
                setUser(userData[0]);
                console.log(userData, "profile user")
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
            console.log("ariculos del usuario", userPosts)

        } else {
            setUserArticles([]);
        }
    }, [user,loggedInUser]);


    return (
        <article className={styles.userPageArticule}>
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
            <>
              <section className={styles.userPage}>
                <header className={styles.userPageHeader}>
                  <h1 className={styles.userPageH1}>{user.name || 'Name not found'}</h1>
                  <p className={styles.userPageP}>@{user.username}</p>
                </header>
    
                <figure className={styles.userPageFigure}>
                  <img
                    src={user.avatar_url}
                    alt={`Avatar de ${user.name || 'user'}`}
                    className={styles.userPageImg}
                  />
                  <figcaption className={styles.userPageFigcaption}>Profile Picture</figcaption>
                </figure>
              </section>
              <section className={styles.userArticles}>
                <h2 className={styles.userArticlesH2}>Articles by {user.username}</h2>
                {userArticles.length > 0 ? (
                  <ul className={styles.userCardUl}>
                    {userArticles.map((article) => (
                      <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                        <li className={styles.userArticleCard}>
                          <img
                            src={article.article_img_url}
                            alt=""
                            className={styles.userArticleCardImg}
                          />
                          <h3 className={styles.userArticleCardH3}>{article.title}</h3>
                          <p className={styles.userArticleCardP}>
                            <strong>Topic:</strong> {article.topic}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <p>This user hasn’t posted any articles yet.</p>
                )}
              </section>
            </>
          )}
        </article>
      );

}
