import { createContext, useState } from "react";

export const ArticlesContext = createContext()

export const ArticlesProvider = ({ children }) => {
    const [trendingArticles, setTrendingArticles] = useState([]);
    const [topicsList, setTopicsList] = useState([]);




    return <ArticlesContext.Provider value={{trendingArticles , setTrendingArticles, topicsList, setTopicsList}} >
        {children}
    </ArticlesContext.Provider>

}