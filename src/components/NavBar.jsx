import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center relative">
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold">Render3D</NavLink>

      {/* Enlaces de navegación */}
      <div className="flex gap-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-gray-400" : "text-white")}>
          Inicio
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-gray-400" : "text-white")}>
          Proyectos
        </NavLink>
        {user?.role === "cliente" && (
          <NavLink to="/my-private-projects" className="text-white hover:text-gray-400">
            Mis Proyectos Privados
          </NavLink>
        )}
      </div>

      {/* Autenticación y Menú del Usuario */}
      <div className="relative">
        {user ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Nombre del usuario */}
            <span className="bg-gray-700 px-4 py-2 rounded">{user.name}</span>

            {/* Menú desplegable */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Perfil
                </NavLink>

                {/* Solo los Admin ven esta opción */}
                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="block px-4 py-2 hover:bg-gray-200 text-nowrap"
                    onClick={() => setMenuOpen(false)}
                  >
                    Panel de Control
                  </NavLink>
                )}

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <NavLink to="/login" className="bg-blue-500 px-4 py-2 rounded">Iniciar Sesión</NavLink>
            <NavLink to="/register" className="bg-green-500 px-4 py-2 rounded">Registrarse</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
