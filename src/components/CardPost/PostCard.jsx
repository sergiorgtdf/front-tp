import { usePost } from "../../context/postContext";
import { Link } from "react-router-dom";

import "./postCard.css";

const BlogCard = ({ post }) => {
    // const handleDelete = () => {
    //     deletePost(post._id);
    // };
    return (
        <div className="post">
            {/* Imagen */}

            <img className="postImg" src={post.imageURL} alt="" />
            <div className="postInfo">
                {/* Autor */}
                <div className="postAutor">
                    <span className="Autor">by {post.autor.username}</span>
                </div>
                {/* Titulo  */}
                <span className="postTitle">
                    <Link to={`/posts/${post._id}`} className="link">
                        {post.title}
                    </Link>
                </span>

                <hr />
                {/* Fecha */}

                <span className="postDate">{post.createdAt}</span>

                <span className="postDate">
                    Comments: {post.comments.length}
                </span>
            </div>
            {/* Descripcion */}

            <p className="postDesc">{post.description}</p>
        </div>
    );
};

export default BlogCard;
