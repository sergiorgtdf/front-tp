import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

import {
    createPostRequest,
    getAllPostsRequest,
    getPostRequest,
    deletePostRequest,
    updatePostRequest,
} from "../api/Posts.js";

const postContext = createContext();

export const usePost = () => {
    const context = useContext(postContext);
    if (!context) throw new Error(["Error en el contexto del blog"]);
    return context;
};

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            const res = await getAllPostsRequest();
            setPosts(res.data);
        } catch (error) {
            toast.error(error.response.data);
            console.log("error (postContext - getAllPosts)");
        }
    };
    const deletePost = async (id) => {
        try {
            await deletePostRequest(id);
            const res = await getAllPostsRequest();
            setPosts(res.data);
            toast.success("Post eliminado");
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post);
            console.log(res.data);
            // setPosts(res.data);
            toast.success("Post creado");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    };

    const getPost = async (id) => {
        try {
            const res = await getPostRequest(id);
            toast.success("Post obtenido");

            return res.data;
        } catch (error) {
            toast.error(error.response.data);
            console.log("error (postContext - getPost)");
        }
    };

    const updatePost = async (id, post) => {
        try {
            const res = await updatePostRequest(id, post);
            toast.success("Post actualizado");
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    return (
        <postContext.Provider
            value={{
                posts,
                getAllPosts,
                deletePost,
                createPost,
                getPost,
                updatePost,
            }}>
            {children}
        </postContext.Provider>
    );
};
