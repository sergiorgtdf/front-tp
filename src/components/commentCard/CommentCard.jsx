import "./CommentCard.css";

const CommentCard = ({ comment, handleDeleteComment, user, avatar }) => {
    return (
        <>
            <div className="contenedor">
                <div className="avatar">
                    <img className="avatar-img" src={avatar} alt="avatar" />
                </div>
                <div className="contenido">
                    <div className="autor">{user}</div>
                    <div className="comment">
                        <p>{comment}</p>
                    </div>
                </div>
                <div className="commentPostEdit">
                    <i className="singlePostIcon far fa-edit"></i>
                    <i className="singlePostIcon far fa-trash-alt"></i>
                </div>
            </div>
        </>
    );
};

export default CommentCard;
