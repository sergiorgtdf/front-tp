import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import HomePg from "../pages/HomePg";
import ProfilePg from "../pages/ProfilePg";
import BlogPg from "../pages/Blog/BlogPg";
import LoginPg from "../pages/LoginPg";
import RegisterPg from "../pages/RegisterPg";
import SinglePostPg from "../pages/Post/singlePostPg";

import NewPostPg from "../pages/Editor/NewPostPg";
export const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<BlogPg />} />
                <Route path="/login" element={<LoginPg />} />
                <Route path="/register" element={<RegisterPg />} />
                <Route path="/logout" element={<HomePg />} />

                <Route path="/posts/:id" element={<SinglePostPg />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" element={<ProfilePg />} />
                    <Route path="/new" element={<NewPostPg />} />
                    <Route path="/edit/:id" element={<NewPostPg />} />
                </Route>
            </Routes>
        </>
    );
};

export default Rutas;
