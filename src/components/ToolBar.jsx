import { useAuth } from "../context/authContext";

export const ToolBar = () => {
    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
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
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/blog">
                                Blog
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/task">
                                Task
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="/profile"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                User
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
