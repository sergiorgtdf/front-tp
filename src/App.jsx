import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
// import { Rutas } from "./pages/Rutas.jsx";
import ToolBar from "./components/ToolBar.jsx";
import Rutas from "./Routes/Rutas.jsx";
import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "./context/authContext.jsx";

function App() {
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AuthProvider>
                <Router>
                    <ToolBar />
                    <Rutas />
                </Router>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
