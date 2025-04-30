import { useContext, useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { getTopics } from "../../services/api";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../context/ErrorContext";
import { ArticlesContext } from "../../context/HomeArticlesContext";
import styles from "./TopicList.module.css";

export const TopicList = () => {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { topicsList, setTopicsList } = useContext(ArticlesContext);

    const { error, setErrorMessage } = useContext(ErrorContext);


    useEffect(() => {

        const fetchTopics = async () => {
            setLoading(true)
            try {
                const topicData = await getTopics();
                setTopics(topicData)
                setTopicsList(topicData)
            } catch (error) {
                setErrorMessage(error.message || "Something went wrong!")
            } finally {
                setLoading(false);
            }
        };
        fetchTopics()
    }, [])

    return (
        <aside>
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
                    zIndex: 999
                }}> <ClipLoader loading={loading} color="#36d7b7" size={90} /> </div>
            ) : (
                <nav className={styles.sidebar}>
                    <ul className={styles.sidebarUl}>
                        <li className={styles.sidebarLi}>
                            <Link to={"/"} className={styles.sidebarLink}>
                            <span className={styles.sidebarSpan}>
                            🛖 
                            </span>
                                <h3 className={styles.sidebarH3}> Home</h3>
                            </Link>
                        </li>
                        <li className={styles.sidebarLi}>
                            <Link to={"/articles"} className={styles.sidebarLink}>
                            <span className={styles.sidebarSpan}>
                            📜
                            </span>
                                <h3 className={styles.sidebarH3}>Articles</h3>
                            </Link>
                        </li>
                        {topics.map((topic) => (
                            <li key={topic.slug} className={styles.sidebarLi}>
                                <Link to={`articles?topic=${topic.slug}`} className={styles.sidebarLink}>
                                    {topic.img_url && (
                                        <span className={styles.sidebarSpan}>
                                            <img
                                                src={topic.img_url}
                                                className={styles.topicImg}
                                                alt={`Avatar for ${topic.slug}`}
                                            />
                                        </span>
                                    )}
                                    <h3 className={styles.sidebarH3}>{topic.slug}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </aside>
    );
};


