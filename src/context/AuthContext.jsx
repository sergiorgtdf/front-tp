import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

import {
    registerRequest,
    loginRequest,
    verifyTokenRequest,
} from "../api/Auth.js";

import Cookies from "js-cookie";

export const AuthContext = createContext();
import Swal from "sweetalert2";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error(["Error en el contexto del usuario"]);
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errorsBack, seterrorsBack] = useState([]);
    const [loading, setLoading] = useState(true);

    //Limpia errores
    useEffect(() => {
        if (errorsBack.length > 0) {
            const timer = setTimeout(() => {
                seterrorsBack([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorsBack]);

    const createUser = async (user) => {
        try {
            const res = await registerRequest(user);

            if (res) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data);
                setIsAuth(true);
                toast.success("Bienvenido");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registrado Correctamente!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            toast.error(error.response.data);

            setIsAuth(false);
            seterrorsBack(error.response.data);
        }
    };

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success("Bienvenido");
                setUser(res.data);
                setIsAuth(true);
            }
        } catch (error) {
            toast.error(error.response.data);

            setIsAuth(false);
            seterrorsBack(error.response.data);
        }
    };

    // Funcion para cerrar sesion - Borra variables
    const logout = () => {
        toast.success("Adios");
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("adios");
        setIsAuth(false);
        setUser(null);
        seterrorsBack([]);
    };

    // Verifica que este logueado
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setLoading(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    return setIsAuth(false);
                }

                setIsAuth(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuth(false);
                setLoading(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                seterrorsBack(error.response.data);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUser,
                login,
                logout,
                isAuth,
                errorsBack,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
