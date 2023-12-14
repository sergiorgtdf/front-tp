import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

import {
    createPostRequest,
    getAllPostsRequest,
    getPostRequest,
    deletePostRequest,
    updatePostRequest,
    addCommentRequest,
} from "../api/Posts.js";

const postContext = createContext();

export const usePost = () => {
    const context = useContext(postContext);
    if (!context) throw new Error(["Error en el contexto del blog"]);
    return context;
};

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [errorBack, setErrorBack] = useState([]);

    //Limpia errores
    useEffect(() => {
        if (errorBack.length > 0) {
            const timer = setTimeout(() => {
                setErrorBack([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorBack]);

    const getAllPosts = async () => {
        try {
            const res = await getAllPostsRequest();
            setPosts(res.data);
        } catch (error) {
            toast.error(error.response.data);
            setErrorBack(error.response.data);
            console.log("error (postContext - getAllPosts)");
            setErrorBack(error.response.data);
        }
    };
    const deletePost = async (id) => {
        toast.success("llamo a Post eliminado");
        try {
            const res = await deletePostRequest(id);
            if (res) return res;
        } catch (error) {
            // setErrorBack(error);
            toast.error(error);
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
            setErrorBack(error.response.data);
        }
    };

    const getPost = async (id) => {
        try {
            const res = await getPostRequest(id);
            toast.success("Post obtenido");

            return res.data;
        } catch (error) {
            toast.error(error.response.data);
            setErrorBack(error.response.data);
            console.log("error (postContext - getPost)");
        }
    };

    const updatePost = async (id, post) => {
        try {
            const res = await updatePostRequest(id, post);
            if (res) return res.data;
            toast.success("Post actualizado");
        } catch (error) {
            setErrorBack(error.response.data);
            toast.error(error.response.data);
        }
    };
    // ok - Back
    const addComment = async (id, comment) => {
        try {
            const res = await addCommentRequest(id, comment);

            if (res) {
                toast.success("comment added");
                //displaySinglePost();
            }
        } catch (error) {
            setErrorBack("Error al agregar comentario");
            toast.error("Error al agregar comentario");
        }
    };

    return (
        <postContext.Provider
            value={{
                errorBack,
                posts,
                getAllPosts,
                deletePost,
                createPost,
                getPost,
                updatePost,
                addComment,
            }}>
            {children}
        </postContext.Provider>
    );
};
