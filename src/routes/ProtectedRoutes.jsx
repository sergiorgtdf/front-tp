import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../styles/style.css";

export const ProtectedRoutes = () => {
    // TODO MOSTRAR EFECTO CARGANDO

    const { loading, isAuth } = useAuth();
    // console.log(user, isAuth);
    // const history = useHistory();

    if (loading)
        return (
            <>
                <div className="loadingSpinner">
                    <Spinner animation="border" variant="primary" />
                    <h1>Cargando...</h1>;
                </div>
            </>
        );
    // si no esta autenticado lo redirecciono al login
    if (loading && !isAuth) return <Navigate to="/login" />;

    console.log(`isAuth rutas protegidas = ${isAuth} `);
    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    // si esta autenticado lo redirecciono al componente hijo
    return <Outlet />;
};
