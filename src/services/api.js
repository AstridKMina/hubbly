import axios from 'axios';


const apiArticles = axios.create({
    baseURL: "https://articles-backend-project.onrender.com/api",
    timeout: 1000,
})


export const getArticles = async (articleTopic) => {
    try {
        const res = await apiArticles.get(`/articles`, { params: 
            { topic: articleTopic}
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching articles:", error.message); 
        throw new Error("Failed to fetch articles");
    } 
}

export const getSoloArticle = async (id) => {
    try {
        const res = await apiArticles.get(`articles/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching article:", error.message); 
        throw new Error("Failed to fetch article");
    }
}

export const getArticleComments = async (id) => {
    try {
        const res = await apiArticles.get(`articles/${id}/comments`)
        return res.data
    } catch (error) {
        console.error("Error fetching article comments:", error.message); 
        throw new Error("Failed to fetch article comments");
    }
}

export const updateArticleVotes = async (id, votes) => {
    try {
        const res = await apiArticles.patch(`articles/${id}/`, {inc_votes:votes})
        return res.data
    } catch (error) {
        console.error("Error fetching article body:", error.message); 
        throw new Error("Failed to fetch article body");
    }
}

export const getUsers = async () => {
    try {
        const res = await apiArticles.get("/users/");
        return res.data
    } catch (error) {
        console.error("Error fetching users :", error.message); 
        throw new Error("Failed to fetch users ");
    };
}


export const createComment = async (id, commentData) => {
    try {
        const res = await apiArticles.post(`articles/${id}/comments`, commentData );
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error("Error creating article comment:", error.message); 
        throw new Error("Failed to fetch article body");
    };
};

export const deleteComment = async (commentId) => {
    try {
        const res = await apiArticles.delete(`/comments/${commentId}`);
        return res.data;
    } catch (error) {
        console.error("Error creating article comment:", error.message); 
        throw new Error("Error deleting comment: " + error.message);
    }
};

export const getTopics = async () => {
    try {
        const res = await apiArticles.get("/topics/");
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error("Error fetching topics:", error.message); 
        throw new Error("Error: " + error.message);
    }
};
