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
    const { posts, getPost, addComment, errorBack, deletePost } = usePost();
    const { user, isAuth } = useAuth();
    const [img, setImg] = useState(
        "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
    );
    const [arrComments, setarrComments] = useState([]);

    const [comment, setComment] = useState("");
    const { id } = useParams();

    const { register, setValue } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                const post = await getPost(id);

                console.log(`User: ${user.id}`);
                console.log(`post: ${post.autor._id}`);
                setValue("title", post.title);
                setValue("description", post.description);
                setValue("imageURL", post.imageURL);
                setValue("autor", post.autor.username);
                setValue("createdAt", post.createdAt);
                setValue("comments", post.comments);
                setarrComments(post.comments);
                setImg(post.imageURL);
            }
        };
        loadPost();
    }, []);

    const deleteP = async (req, res) => {};

    const onSubmitaddComment = async (e) => {
        e.preventDefault();

        try {
            console.log(`idPost: ${id} comentario: ${comment}`);
            const { res } = await addComment(id, comment);
            if (res) {
                setarrComments(res.comments);

                toast.success("Comentario publicado");
            }
        } catch (error) {
            toast.error(error);
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
                            {/* {user.id === posts.autor._id ? (
                                <div className="singlePostEdit">
                                    <Link to={`/edit/${id}`} className="link">
                                        <i className="editPostIcon far fa-edit"></i>
                                    </Link>
                                    <Link
                                        onClick={deleteP()}
                                        // to={`/delete-post/${id}`}
                                        className="link">
                                        <i className="trashPostIcon far fa-trash-alt"></i>
                                    </Link>
                                </div>
                            ) : (
                                <p></p>
                            )} */}

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
