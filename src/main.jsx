import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import LoginPg from "./pages/Login-Register/LoginPg.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <LoginPg /> */}
        <App />
    </React.StrictMode>
);
