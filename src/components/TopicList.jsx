import { useContext, useEffect, useState } from "react";
import { getTopics } from "../services/api";
import { Link } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";


export const TopicList = () => {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null)

    const { error, setErrorMessage } = useContext(ErrorContext);


    useEffect(() => {

        const fetchTopics = async () => {
            try {
                const topicData = await getTopics();
                setTopics(topicData)

            } catch (error) {
                setErrorMessage(error.message || "Something went wrong!")
            } finally {
                setLoading(false);
            }
        };
        fetchTopics()
    }, [])


    if (loading) {
        return <p className="loadinng">loading topics......</p>
    }



    return (
        <aside className="sidebar-container">
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
                            <Link to={`articles?topic=${topic.slug}`} activeClassName="active">
                            <span><img src={topic?.img_url} alt={`${topic.slug} avatar`}/></span>
                                <h3>{topic.slug}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};


