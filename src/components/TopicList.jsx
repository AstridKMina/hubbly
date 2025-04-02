import { useEffect, useState } from "react";
import { getTopics } from "../services/api";
import { Link } from "react-router-dom";


export const TopicList = () => {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)



    useEffect(() => {

        const fetchTopics = async () => {
            try {
                const topicData = await getTopics();
                setTopics(topicData)

            } catch (error) {
                console.error("Error fetching topics", error.message)
                setError("Error" + error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchTopics()
    }, [])

    if (error) {
        return <p className="error">{error}</p>
    }

    if (loading) {
        return <p className="loadinng">loading topics......</p>
    }

    return (
        <aside className="sidebar-container">
            <nav className="sidebar">
                <ul>
                    <Link to={"/"}>
                        <h3>Home</h3>
                    </Link>
                    <Link to={"/"}>
                        <h3>Articles</h3>
                    </Link>
                    {topics.map((topic) => (
                        <li key={topic.slug}>
                             <Link to={`?topic=${topic.slug}`}>  {/* Debo modificarlo despues */}
                                <h3>{topic.slug}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )

}