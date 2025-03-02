import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";

const ProtectedRoute = ({ element, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return element;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} role="admin" />} />
    </Routes>
  );
};

export default AppRouter;
