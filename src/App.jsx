import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";

import NavBar from "./components/NavBar";
import HomePg from "./pages/HomePg";
import LoginPg from "./pages/Login-Register/LoginPg";
import RegisterPg from "./pages//Login-Register/RegisterPg";
import PostPg from "./pages/PostPg";
import NewPostPg from "./pages/NewPostPg";
// import NotFoundPg from "./pages/NotFoundPg";

export const App = () => {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<NavBar />}>
                            {/* Rutas Publicas */}
                            <Route path="/" element={<HomePg />} />
                            <Route path="/login" element={<LoginPg />} />
                            <Route path="/register" element={<RegisterPg />} />
                            {/* <Route path="*" element={<NotFoundPg />} /> */}
                            {/* Rutas Privadas */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/post" element={<PostPg />} />
                                <Route
                                    path="/newpost"
                                    element={<NewPostPg />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
};
