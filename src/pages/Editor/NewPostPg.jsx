import "./NewPost.css";
import { Toaster } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { usePost } from "../../context/postContext";
import { useEffect, useState } from "react";

const NewPostPg = () => {
    const { getPost, createPost, updatePost } = usePost();
    const [img, setImg] = useState(
        "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
    );

    const params = useParams();
    const { id } = useParams();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        try {
            if (id) {
                // update
                console.log(data);
                updatePost(params.id, data);
            } else {
                // create
                createPost(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                const post = await getPost(id);
                setValue("title", post.title);
                setValue("description", post.description);
                setValue("imageURL", post.imageURL);
                setImg(post.imageURL);
            }
        };
        loadPost();
    }, []);

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="desc-img">
                    {/* Titulo del post */}

                    <img src={img} alt="" />

                    <input
                        type="text"
                        name="title"
                        placeholder="Titulo"
                        required
                        {...register("title", { required: true })}
                        autoFocus
                    />
                    {/* Imagen del post */}
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="URL de la imagen"
                        required
                        {...register("imageURL", { required: true })}
                    />
                    {/* Contenido del post */}
                    <textarea
                        name="description"
                        cols="30"
                        rows="10"
                        placeholder="Conta tu historia"
                        required
                        {...register("description", { required: true })}
                    />
                    <div className="boton">
                        <button className="publish">Publicar</button>
                    </div>
                </div>
            </form>
            <Toaster />
        </div>
    );
};
export default NewPostPg;
