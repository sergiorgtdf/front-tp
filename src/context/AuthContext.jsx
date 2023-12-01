import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerReq, verifyToken } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isAuth, setIsAuth] = useState(false);

    const [errorBackend, setErrorBackend] = useState([]);

    const register = async (user) => {
        try {
            const res = await registerReq(user);
            if (res.data.success) {
                setUser(res.data.user);
                setIsAuth(true);
            } else {
                alert(res.data.message);
                setErrorBackend(res.data.message);
            }
        } catch (error) {
            setErrorBackend(error.message);
        }
    };

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res.data) {
                setUser(res.data.user);
                setIsAuth(true);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            } else {
                alert("Error al iniciar sesion");
                setIsAuth(false);
                setErrorBackend(res.data.message);
            }
            return;
        } catch (error) {
            setIsAuth(false);
            setErrorBackend(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setIsAuth(false);
        setUser(null);
        window.location.replace("/login");
    };

    useEffect(() => {
        if (errorBackend.length > 0) {
            const timer = setTimeout(() => {
                setErrorBackend([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorBackend]);

    useEffect(() => {
        async function verifyLogin() {
            console.log("Verify Login");
            const userLS = JSON.parse(localStorage.getItem("user"));
            console.log(userLS);
            const tokenLS = localStorage.getItem("token");
            console.log(tokenLS);
            // si no tenemos alguno de los dos campos en el localStorage borramos todo
            if (!userLS || !tokenLS) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");

                setIsAuth(false);
                setUser(null);
                setLoading(false);
            } else {
                // verificar token
                const respToken = verifyToken(tokenLS);
                console.log(respToken);
                if (!respToken.data) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setLoading(false);
                    setIsAuth(false);
                    setUser(null);
                    setLoading(false);
                }
            }
            console.log(`Loadin ${loading} - isAuth ${isAuth}`);
        }
        verifyLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                register,
                isAuth,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
