import { useEffect } from "react";
import { usePost } from "../../context/postContext";
import { ImFileEmpty } from "react-icons/im";
import PostCard from "../../components/CardPost/PostCard";
import { Header } from "../../components/Headers/Header";
import "../../styles/style.css";
import toast from "react-hot-toast";

export const BlogPg = () => {
    const { posts, getAllPosts } = usePost();

    const cargarPosts = async () => {
        try {
            getAllPosts();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        cargarPosts();
    }, []);

    return (
        <>
            <Header />
            {posts.length === 0 && (
                <div className="NoPostContainer">
                    <div>
                        <ImFileEmpty />
                        <h1>No hay entradas en el blog!</h1>
                    </div>
                </div>
            )}
            {
                <div className="postContainer">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            }
        </>
    );
};
export default BlogPg;
