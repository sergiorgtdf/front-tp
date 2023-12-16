import "./single.css";

import toast, { Toaster } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { usePost } from "../../context/postContext";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentCard from "../../components/commentCard/CommentCard";

const SinglePostPgy = () => {
    const { posts, getPost, addComment, deletePost } = usePost();
    const { user, isAuth } = useAuth();
    const [img, setImg] = useState(
        "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
    );
    const [arrComments, setarrComments] = useState([]);

    const [comment, setComment] = useState("");
    const params = useParams();
    const [activaEdicion, setActivaEdicion] = useState(false);

    const { register, setValue } = useForm();

    const navigate = useNavigate();

    const loadPost = async () => {
        if (params.id) {
            const post = await getPost(params.id);

            setValue("title", post.title);
            setValue("description", post.description);
            setValue("imageURL", post.imageURL);
            setValue("autor", post.autor.username);
            setValue("createdAt", post.createdAt);
            setValue("_id", post.autor._id);
            // setValue("comments", post.comments);
            setActivaEdicion(post.autor._id === user.id);

            setarrComments(post.comments);
            setImg(post.imageURL);
        }
    };

    useEffect(() => {
        loadPost();
    }, []);

    const deleteP = async (req, res) => {
        if (!isAuth) {
            deletePost(params.id);
            toast.error("Debes iniciar sesion para comentar");
        } else {
            // toast.success("Post eliminado");
        }
    };

    const onSubmitaddComment = async (e) => {
        e.preventDefault();
        if (!isAuth) {
            toast.error("Debes iniciar sesion para comentar");
        } else {
            try {
                console.log(`idPost: ${params.id} comentario: ${comment}`);
                const res = await addComment(params.id, { comment });
                // setarrComments(res.data);
                setComment("");
                loadPost();
            } catch (error) {
                console.log("Error al agregar comentario");
            }
        }
    };

    return (
        <div className="container">
            <div className="singlePostView">
                <div className="singlePostWrapper">
                    <form>
                        <div className="desc-img">
                            {/* Titulo del post */}

                            <img className="singlePostImg" src={img} alt="" />

                            <input
                                className="title"
                                type="text"
                                name="title"
                                placeholder="Titulo"
                                readOnly
                                {...register("title")}
                            />

                            {activaEdicion ? (
                                <div className="singlePostEdit">
                                    <Link
                                        to={`/edit/${params.id}`}
                                        className="link">
                                        <i className="editPostIcon far fa-edit"></i>
                                    </Link>
                                    <Link
                                        onClick={deleteP()}
                                        to={`/delete-post/${params.id}`}
                                        className="link">
                                        <i className="trashPostIcon far fa-trash-alt"></i>
                                    </Link>
                                </div>
                            ) : (
                                <div className="NoConect">
                                    <p>Solo el autor puede editar</p>
                                </div>
                            )}

                            <div className="singlePostInfo">
                                <span>
                                    Autor:
                                    <input
                                        className="span-negrita"
                                        name="autor"
                                        readOnly
                                        {...register("autor")}
                                    />
                                </span>
                                <span>
                                    Fecha de creacion:
                                    <input
                                        className="span-negrita"
                                        name="createdAt"
                                        readOnly
                                        {...register("createdAt")}
                                    />
                                </span>
                            </div>

                            {/* Contenido del post */}
                            <textarea
                                className="description"
                                name="description"
                                cols="30"
                                rows="10"
                                readOnly
                                {...register("description", { required: true })}
                            />
                        </div>
                    </form>
                </div>
                <hr />
                <div className="ListComnent">
                    <h3>Comentarios</h3>

                    {arrComments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            comment={comment.comment}
                            autor={comment.autor.username}
                            avatar={comment.autor.imageURL}
                            index={comment._id}
                        />
                    ))}
                </div>
                <div className="comment">
                    <form onSubmit={onSubmitaddComment}>
                        <textarea
                            name=""
                            placeholder="Escribe un comentario"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            id=""
                            cols="80"
                            rows="4"
                        />

                        <button type="submit" className="publish">
                            Publicar
                        </button>
                    </form>
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default SinglePostPgy;
