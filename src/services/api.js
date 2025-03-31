import axios from 'axios';


const apiArticles = axios.create({
    baseURL: "https://articles-backend-project.onrender.com/api",
    timeout: 1000,
})


export const getArticles = async () => {
    try {
        const res = await apiArticles.get("/articles");
        console.log(res.data)
        return res.data
    } catch (error) {

    }
   
}
 getArticles()