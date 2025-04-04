import { useContext, useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { getTopics } from "../services/api";
import { Link } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";
import { ArticlesContext } from "../context/HomeArticlesContext";


export const TopicList = () => {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null)
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
        <aside className="sidebar-container">
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
                <nav className="sidebar">
                    <ul>
                        <li>
                            <Link to={"/"}>
                                <h3> 🛖 Home</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/articles"}>
                                <h3> 📜 Articles</h3>
                            </Link>
                        </li>
                        {topics.map((topic) => (
                            <li key={topic.slug}>
                                <Link to={`articles?topic=${topic.slug}`} >
                                    <span><img src={topic?.img_url} alt={`${topic.slug} avatar`} /></span>
                                    <h3>{topic.slug}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </aside>
    );
};


