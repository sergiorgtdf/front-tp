import { useContext, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

// export const ProtectedRoute = () => {
//     const navigate = useNavigate();

//     const { loading, isAuth } = useAuth();
//     console.log(`Loadin ${loading} - isAuth ${isAuth}`);
//     console, log("paso por rutas privadas");
//     if (loading) return <h1>`Cargando...`</h1>;

//     if (!isAuth) return <Navigate to="/login" replace />;
//     // si no esta autenticado lo redirecciono al login
//     if (loading && !isAuth) return <Navigate to="/login" replace />;
//     //     true       false
//     //     false       true

//     if (!loading && !isAuth) return <Navigate to="/login" replace />;

//     // si esta autenticado lo redirecciono al componente hijo
//     return <Outlet />;
// };

// export default ProtectedRoute;

function ProtectedRoute() {
    const { isAuth, loading } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    if (!isAuth) navigate("/login");
    if (loading) return <h1>`Cargando...`</h1>;
    return <Outlet />;
}
export default ProtectedRoute;
