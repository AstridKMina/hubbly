import axios from 'axios';


const apiArticles = axios.create({
    baseURL: "https://articles-backend-project.onrender.com/api",
    timeout: 1000,
})


export const getArticles = async () => {
    try {
        const res = await apiArticles.get("/articles");
        // console.log(res.data)
        return res.data
    } catch (error) {
        console.error("Error fetching articles:", error.message); 
        throw new Error("Failed to fetch articles");
    }
   
}

export const getSoloArticle = async (id) => {
    try {
        const res = await apiArticles.get(`articles/${id}`)
        return res.data
    } catch (error) {
        console.error("Error fetching articles:", error.message); 
        throw new Error("Failed to fetch articles");
    }
}

getSoloArticle(1)