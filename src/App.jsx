import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import Navbar from "./components/NavBar";

export const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="*" element={<Navbar />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};
