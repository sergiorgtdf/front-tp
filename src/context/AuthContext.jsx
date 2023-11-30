import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerReq, verifyToken } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [errorBackend, setErrorBackend] = useState([]);

    const register = async (user) => {
        try {
            const res = await registerReq(user);
            if (res.data.success) {
                setUser(res.data.user);
                setIsAuthenticated(true);
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
            if (res.data.success) {
                setUser(res.data.user);
                setIsAuthenticated(true);
            } else {
                alert(res.data.message);
                setErrorBackend(res.data.message);
            }
        } catch (error) {
            setErrorBackend(error.message);
        }
    };

    const signout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        if (errorBackend.length > 0) {
            //el uso de timers en react es peligroso por eso generamos lo siguiente
            const timer = setTimeout(() => {
                setErrorBackend([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorBackend]);

    useEffect(() => {
        async function verifyLogin() {
            const cookies = Cookies.get();
            if (cookies.token) {
                try {
                    const res = await verifyToken(cookies.token);
                    console.log(res);
                    if (res.data) {
                        setIsAuthenticated(true);
                        setUser(res.data);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        }
        verifyLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signout,
                register,
                isAuthenticated,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
