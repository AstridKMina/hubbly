import { useContext, useEffect, useState } from "react"
import { ClipLoader } from 'react-spinners';
import { getUser } from "../services/api";
import { UsersList } from "../components/UsersList";
import { ErrorContext } from "../context/ErrorContext";
import { UserContext } from "../context/UserPageContext";
import { Link, useParams } from "react-router-dom";
import { ArticlesContext } from "../context/HomeArticlesContext";

export const UserPage = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const { error, setErrorMessage } = useContext(ErrorContext);


    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const { trendingArticles, setTrendingArticles, topicsList, setTopicsList } = useContext(ArticlesContext);


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
            const userPosts = trendingArticles.filter(
                (article) => article.author === user.username
            );
            setArticles(userPosts);
            console.log("ariculos del usuario", userPosts)

        } else {

            setArticles([]);
        }
    }, [user, trendingArticles, loggedInUser]);


    // if (loading) {
    //     <div style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         height: '100vh'>
    //         return 
    //     </div>

    // }

    return (

        <article className="user-page-articule">
            {loading ? (
                 < div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white', 
                    zIndex: 999}}> <ClipLoader  loading={loading}color="#36d7b7" size={90} /> </div>
    ) : (
        <>
            <section className="user-page">
                <header>
                    <h1>{user.name || 'Nombre no disponible'}</h1>
                    <p>@{user.username}</p>
                </header>

                <figure>
                    <img src={user.avatar_url} alt={`Avatar de ${user.name || 'usuario'}`} />
                    <figcaption>Profile Picture</figcaption>
                </figure>
            </section>
            <section className="user-articles">
                <h2>Articles by {user.username}</h2>
                {articles.length > 0 ? (
                    <ul className="user-card-ul">
                        {articles.map((article) => (
                            <Link to={`/articles/${article.article_id}`}>

                                <li key={article.article_id} className="user-article-card">
                                    <img src={article.article_img_url} alt="" />
                                    <h3>{article.title}</h3>
                                    <p><strong>Topic:</strong> {article.topic}</p>
                                </li>
                            </Link>

                        ))}
                    </ul>
                ) : (
                    <p>This user hasn’t posted any articles yet.</p>
                )}
            </section>
        </>)
}
        </article >
    );

}
