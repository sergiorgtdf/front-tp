import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import HomePg from "../pages/HomePg";
import ProfilePg from "../pages/ProfilePg";
import BlogPg from "../pages/Blog/BlogPg";
import LoginPg from "../pages/LoginPg";
import RegisterPg from "../pages/RegisterPg";

import NewPostPg from "../pages/Editor/NewPostPg";
import SinglePostPgy from "../pages/Post/SinglePosty";
import AboutPg from "../pages/About/AboutPg";
import ContactPg from "../pages/Contact/ContactPg";
export const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<BlogPg />} />
                <Route path="/login" element={<LoginPg />} />
                <Route path="/register" element={<RegisterPg />} />
                <Route path="/logout" element={<HomePg />} />

                {/* <Route path="/posts/:id" element={<SinglePostPg />} /> */}
                <Route path="/posts/:id" element={<SinglePostPgy />} />

                <Route path="/about" element={<AboutPg />} />
                <Route path="/contact" element={<ContactPg />} />

                <Route element={<ProtectedRoutes />}>
                    <Route
                        path="/profile"
                        element={<ProfilePg currentPage="/profile" />}
                    />
                    <Route path="/new" element={<NewPostPg />} />
                    <Route path="/edit/:id" element={<NewPostPg />} />
                </Route>
            </Routes>
        </>
    );
};

export default Rutas;
