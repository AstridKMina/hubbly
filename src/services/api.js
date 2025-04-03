import axios from 'axios';


const apiArticles = axios.create({
    baseURL: "https://articles-backend-project.onrender.com/api",
    timeout: 1000,
});

const handleApiError = (error, customMessage) => {
    console.error(customMessage, error);

    if(error.response) {
        return new Error(error.response.data.msg || customMessage);
    } else if (error.request) {
        return new Error("No response. Please check your network.");
    } else {
        return new Error(customMessage);
    }
};


export const getArticles = async (sortBy, orderBy, articleTopic) => {
    try {
        const params = {};
        
        if (articleTopic) params.topic = articleTopic;
        if (sortBy) params.sort_by = sortBy;
        if (orderBy) params.order = orderBy;

        const res = await apiArticles.get(`/articles`, { params }); 
        return res.data;
    } catch (error) {
        throw handleApiError(error, "Failed to fetch articles");
    } 
}

export const getSoloArticle = async (id) => {
    try {
      
        if(!id) throw new Error("Article ID is required");
        const res = await apiArticles.get(`articles/${id}`);
        return res.data;
    } catch (error) {
        throw handleApiError(error, "Failed to fetch article");
    }
}

export const getArticleComments = async (id) => {
    try {
        const res = await apiArticles.get(`articles/${id}/comments`)
        return res.data
    } catch (error) {
        throw handleApiError(error,"Failed to fetch article comments");
    }
}

export const updateArticleVotes = async (id, votes) => {
    try {
        if (!id || typeof votes !== "number") throw new Error("Invalid article ID or votes");
        const res = await apiArticles.patch(`articles/${id}/`, {inc_votes:votes})
        return res.data
    } catch (error) {
        throw handleApiError(error, "Failed to update article votes");
    }
}

export const getUsers = async () => {
    try {
        const res = await apiArticles.get("/users/");
        return res.data
    } catch (error) {
        throw handleApiError(error, "Failed to fetch users ");
    };
}


export const createComment = async (id, commentData) => {
    try {
        if (!id || !commentData?.body) throw new Error("Invalid article ID or empty comment");

        const res = await apiArticles.post(`articles/${id}/comments`, commentData );
        console.log(res.data)
        return res.data
    } catch (error) {
        throw handleApiError(error, "Failed to create comment");
    };
};

export const deleteComment = async (commentId) => {
    try {
        if (!commentId) throw new Error("Comment ID is required");
    
        const res = await apiArticles.delete(`/comments/${commentId}`);
        return res.data;
      } catch (error) {
        throw handleApiError(error, "Failed to delete comment");
      }
};

export const getTopics = async () => {
    try {
        const res = await apiArticles.get("/topics/");
        return res.data
    } catch (error) {
        throw handleApiError(error, "Failed to fetch Topics");
    }
};
