import "./post.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { usePost } from "../../context/postContext";

import { Link } from "react-router-dom";
import CommentCard from "../../components/commentCard/CommentCard";

// import { set } from "react-hook-form";

const SinglePostPg = () => {
    const { getPost } = usePost();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    // Id - ok
    console.log(id);

    // use form
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const displayPost = async () => {
        if (loading) {
            console.log(loading);
            try {
                const a = await getPost(id);

                setLoading(false);
                setPosts(a);

                // getPost(id);
                // setLoading(false);
            } catch (error) {
                console.log("No se pudo cargar el post (displayPost)");
            }
        }
    };

    //Busca el post por id
    var n = 0;
    useEffect(() => {
        n++;
        if (loading) {
            console.log("paso por el use effect ", n);
            displayPost();
            setLoading(false);
        }
    }, []);

    // if (!post) return "";

    return (
        <div className="container">
            <div className="singlePost">
                <div className="singlePostWrapper">
                    
                    <img
                        className="singlePostImg"
                        name="imageURL"
                        src={posts.imageURL}
                        alt=""
                    />

                    <h1 className="singlePostTitle"
                        name="title"
                        {...register("title" })
                    >
                        {posts.title}
                        <div className="singlePostEdit">
                            <Link to={`/edit/${id}`} className="link">
                                <i className="singlePostIcon far fa-edit"></i>
                            </Link>
                            <i className="singlePostIcon far fa-trash-alt"></i>
                        </div>
                    </h1>
                    <div className="singlePostInfo">
                        <span>
                            Author:
                            <b className="singlePostAuthor">
                                {posts.autor && posts.autor.username}
                            </b>
                        </span>
                        <span>
                            {posts.createdAt &&
                                new Date(posts.createdAt).toLocaleDateString(
                                    "es-AR",
                                    {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                        </span>
                    </div>
                </div>
                <p className="singlePostDesc">{posts.description}</p>

                <Toaster />
            </div>

            <hr />
            <div className="comment">
                <h2>Comentarios</h2>
                <CommentCard />
            </div>
        </div>
    );
};

export default SinglePostPg;
