import ReactQuill from "react-quill";
import { set, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import EditQuill from "../../components/EditQuill";
import { useEffect, useState } from "react";
import { usePost } from "../../context/postContext";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/EditQuill";

import { Toaster, toast } from "react-hot-toast";

const CreatePg = () => {
    const { id } = useParams();
    const { createPost, updatePost, getPost } = usePost();
    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [imageURL, setimageURL] = useState("");
    // const [content, setContent] = useState("");

    const params = useParams();
    // console.log(params.id);
    // useForm
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            if (params.id) {
                updatePost(params.id, {
                    ...data,
                });
                toast.success("Post updated");
            } else {
                createPost({
                    ...data,
                });
                toast.success("Post created");
            }
        } catch (error) {
            toast.error(error.response.data);
            console.log(error);
        }
    };

    const onEditorStateChange = (editorState) => {
        setValue("content", editorState);
    };

    useEffect(() => {
        const loadpost = async () => {
            if (params.id) {
                const res = await getPost(id);
                setPosts(res);
                // setPosts(await getPost(id));
                console.log(`Se Obtiene el post ${posts}`);
                setValue("title", posts.title);
                setValue("description", posts.description);
                setValue("imageURL", posts.imageURL);
                setValue("content", posts.content);
                setTitle(posts.title);
                setdescription(posts.description);
                setimageURL(posts.imageURL);
            }
        };
        loadpost();
    }, []);

    // async function NewPost(ev) {
    //     ev.preventDefault();

    //     const data = new posts();
    //     data.set("title", title);
    //     data.set("description", description);
    //     data.set("imageURL", imageURL);

    //     console.log(data);
    //     const res = createPost(data);
    //     if (res.status === 200) {
    //         toast.success("Post created");
    //         navigate("/");
    //     } else {
    //         toast.error("Error creating post");
    //     }
    // }

    const editorContent = watch("content");
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder={"Title"}
                value={title}
                {...register("title")}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
                type="text"
                placeholder={"imageURL"}
                value={imageURL}
                {...register("imageURL")}
                onChange={(ev) => setimageURL(ev.target.value)}
            />
            <input
                type="text"
                placeholder={"description"}
                value={description}
                {...register("description")}
                onChange={(ev) => setdescription(ev.target.value)}
            />

            <button style={{ marginTop: "5px" }}>Publicar</button>
            <Toaster />
        </form>
    );
};

export default CreatePg;
