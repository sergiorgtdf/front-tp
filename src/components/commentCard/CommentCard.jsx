import "./CommentCard.css";

const CommentCard = ({ comment, autor, avatar, index }) => {
    return (
        <>
            <div className="contenedor">
                <div className="pic-avatar">
                    <img className="pic" src={avatar} alt="Avatar usuario" />
                </div>
                <div className="content">
                    <p className="autor">{autor}</p>
                    <p>{comment}</p>
                </div>
                <p className="id">{index}</p>
            </div>
        </>
    );
};

export default CommentCard;
