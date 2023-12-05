import { createContext, useContext, useState } from "react";
import { registerRequest, loginRequest, verifyToken } from "../api/Auth.js";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Variable de contexto
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Error en el contexto del usuario");
    return context;
};

export const AuthProvider = ({ children }) => {
    // Guarda datos del usuario
    const [user, setUser] = useState(null);
    // Guarda si la pagina se esta cargando
    const [loading, setLoading] = useState(true);
    // Guarda si el usuario esta autenticado
    const [isAuth, setIsAuth] = useState(false);

    // Manejo el estado del  error
    const [errorBack, setErroBack] = useState([]);
    // ---------------------- FUNCIONES --------------------------------
    // Registro de Usuario
    const createUser = async (user) => {
        try {
            const respuesta = await registerRequest(user);
            // console.log(respuesta.data);
            setUser(respuesta.data);
            setIsAuth(true);
        } catch (error) {
            setIsAuth(false);
            // console.log(error.response.data);
            setErroBack(error.response.data);
        }
    };

    const login = async (user) => {
        try {
            const respuesta = await loginRequest(user);
            if (respuesta) {
                //  coo ookies.set({"token", respuesta.data.token});
                localStorage.setItem("token", respuesta.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(respuesta.data.user)
                );
            }
            setUser(respuesta.data);
            setIsAuth(true);
        } catch (error) {
            setIsAuth(false);
            console.log(error.response.data);
            setErroBack(error);
        }
    };

    // Funcion para cerrar sesion - Borra variables
    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("adios");
        setIsAuth(false);
        setUser(null);
    };

    // ---------------------- FUNCIONES --------------------------------
    //borrar mensaje de error
    useEffect(() => {
        if (errorBack.length > 0) {
            const timer = setTimeout(() => {
                setErroBack([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorBack]);

    // Verifica si el usuario esta logueado, cuando se recarga la pagina

    // guarda cookiek
    useEffect(() => {
        async function verifyLogin() {
            const cookie = Cookies.get();
            // console.log(cookie.token);
            if (!cookie.token) {
                Cookies.remove("token");
                setIsAuth(false);
                setUser(null);
            }
            try {
                const respuesta = await verifyToken(cookie.token);
                // console.log(respuesta);
                if (!respuesta.data) {
                    setIsAuth(false);
                    setUser(null);
                    Cookies.remove("token");

                    setLoading(false);
                }
                setUser(respuesta.data);
                setIsAuth(true);
                setLoading(false);
            } catch (error) {
                setIsAuth(false);
                setUser(null);
                Cookies.remove("token");
                setLoading(false);
                // console.log(error.response);
            }
        }
        verifyLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                createUser,
                login,
                logout,
                loading,
                isAuth,
                user,
                errorBack,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
