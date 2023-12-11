import axios from "./SetCredentials.js";

export const getAllPostsRequest = async () => axios.get("/posts");

export const getPostRequest = async (id) => axios.get(`/posts/${id}`);

export const createPostRequest = async (post) => axios.post("/posts", post);

export const updatePostRequest = async (id, post) => {
    console.log(`ID ${id} , post ${post}`);
    axios.put(`/posts/${id}`, post);
};

export const deletePostRequest = async (id) => axios.delete(`/posts/${id}`);
