import { useAuth } from "../../context/authContext";

export const ToolBar = () => {
    const { logout, isAuth } = useAuth();

    return (
        <nav className=" relative navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid justify-content-left">
                <a className="navbar-brand" href="/">
                    Blog
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse "
                    id="navbarNavDropdown">
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/new">
                                Nuevo Post
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="/profile"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {isAuth ? (
                                    <img
                                        src={JSON.parse(
                                            localStorage.getItem(
                                                "user.user.imageURL"
                                            )
                                        )}
                                        alt="..."
                                        className="rounded-circle"
                                        width="30"
                                        height="30"
                                    />
                                ) : (
                                    <img
                                        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                        alt="..."
                                        className="rounded-circle"
                                        width="30"
                                        height="30"
                                    />
                                )}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="/profile">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Change Password
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        onClick={() => logout()}
                                        href="/">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default ToolBar;
