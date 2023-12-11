import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
// import { Rutas } from "./pages/Rutas.jsx";
import ToolBar from "./components/ToolBar.jsx";
import Rutas from "./Routes/Rutas.jsx";

import { AuthProvider } from "./context/authContext.jsx";
import { PostProvider } from "./context/postContext.jsx";

function App() {
    return (
        <AuthProvider>
            <PostProvider>
                <Router>
                    <ToolBar />
                    <Rutas />
                    <footer />
                </Router>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
