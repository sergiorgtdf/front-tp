import { Link } from "react-router-dom";
function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="/">
                Argentina Programa
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/post">
                            Post
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/newpost">
                            New Post
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/login">
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;
