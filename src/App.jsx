import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
// import { Rutas } from "./pages/Rutas.jsx";
// import ToolBar from "./components/toolBar/ToolBar.jsx";
import Rutas from "./Routes/Rutas.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { PostProvider } from "./context/postContext.jsx";
import TopBar from "./components/TopBar/TopBar.jsx";

function App() {
    return (
        <AuthProvider>
            <PostProvider>
                <Router>
                    <TopBar />

                    <Rutas />
                    <Footer />
                </Router>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
