import { Routes, Route } from "react-router-dom";
import HomePg from "../pages/HomePg";
import ProfilePg from "../pages/ProfilePg";
import BlogPg from "../pages/BlogPg";
import LoginPg from "../pages/LoginPg";
import RegisterPg from "../pages/RegisterPg";
import { ProtectedRoutes } from "./ProtectedRoutes";
export const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePg />} />
                <Route path="/login" element={<LoginPg />} />
                <Route path="/register" element={<RegisterPg />} />
                <Route path="/logout" element={<HomePg />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" element={<ProfilePg />} />
                    <Route path="/blog" element={<BlogPg />} />
                </Route>
            </Routes>
        </>
    );
};

export default Rutas;
