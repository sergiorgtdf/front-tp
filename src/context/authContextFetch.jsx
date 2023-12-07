import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
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
    if (!context) throw new Error("Error en el contexto del usuario");
    return context;
};

const mensaje = (mensaje, icono) => {
    Swal.fire({
        position: "top-end",
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //Limpia errores
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const createUser = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 200) {
                setUser(res.data);
                setIsAuth(true);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registrado Correctamente!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data,
                showConfirmButton: false,
                timer: 1500,
            });
            // console.log(JSON.stringify(error));
            setErrors(error);
        }
    };

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data);
                setIsAuth(true);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registrado Correctamente!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data,
                showConfirmButton: false,
                timer: 1500,
            });
            setIsAuth(false);
            setErrors(error.response.data);
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
                if (!res.data) return setIsAuth(false);

                setIsAuth(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuth(false);
                setLoading(false);
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
                errors,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
