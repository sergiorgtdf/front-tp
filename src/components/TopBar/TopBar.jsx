import "./topBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const TopBar = () => {
    // const user = false;
    const { user, logout, isAuth } = useAuth();

    return (
        <div className="top">
            <div className="topLeft">
                <h1>Blog</h1>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/about">
                            ABOUT
                        </Link>
                    </li>

                    <li className="topListItem">
                        <Link className="link" to="/contact">
                            CONTACT
                        </Link>
                    </li>
                    {user && (
                        <li className="topListItem">
                            <Link className="link" to="/new">
                                WRITE
                            </Link>
                        </li>
                    )}

                    {user && (
                        <li className="topListItem" onClick={() => logout()}>
                            LOGOUT
                        </li>
                    )}
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link className="link" to="/profile">
                        {!user.imageURL ? (
                            <img
                                className="topImg"
                                src="../../img/userAnonimo.jpg"
                                alt="NoPic"
                            />
                        ) : (
                            <img
                                className="topImg"
                                src={user.imageURL}
                                alt=""
                            />
                        )}
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    );
};

export default TopBar;
