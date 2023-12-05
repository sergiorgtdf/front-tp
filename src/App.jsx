import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
// import { Rutas } from "./pages/Rutas.jsx";
import ToolBar from "./components/ToolBar.jsx";
import Rutas from "./Routes/Rutas.jsx";

import { AuthProvider } from "./context/authContext.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <ToolBar />
                <Rutas />
            </Router>
        </AuthProvider>
    );
}

export default App;
