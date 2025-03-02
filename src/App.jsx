import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/Router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <AuthProvider>  {/* ❌ useNavigate() está aquí, pero aún NO hay Router */}
        <Navbar />
        <AppRouter />
      </AuthProvider>
    </Router>
  );
};

export default App;
