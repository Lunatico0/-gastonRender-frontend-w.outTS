import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import NewProjectForm from "../components/NewProjectForm.jsx";
import ClientsSection from "../components/ClientsSection.jsx";
import HomeSettings from "../components/HomeSettings.jsx";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [selectedSection, setSelectedSection] = useState("projects");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("❌ Error obteniendo proyectos:", error);
    }
  };

  const toggleProjectVisibility = async (id, status) => {
    try {
      await api.put(`/projects/${id}`, { status: status === "publico" ? "oculto" : "publico" });
      fetchProjects();
    } catch (error) {
      console.error("❌ Error cambiando visibilidad:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <button onClick={() => setSelectedSection("projects")} className="block w-full text-left py-2 px-4 hover:bg-gray-700">
          Proyectos
        </button>
        <button onClick={() => setSelectedSection("newProject")} className="block w-full text-left py-2 px-4 hover:bg-gray-700">
          Crear Proyecto
        </button>
        <button onClick={() => setSelectedSection("clients")} className="block w-full text-left py-2 px-4 hover:bg-gray-700">
          Usuarios
        </button>
        <button onClick={() => setSelectedSection("settings")} className="block w-full text-left py-2 px-4 hover:bg-gray-700">
          Configuración Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedSection === "projects" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lista de Proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project._id} className="p-4 border rounded shadow-md">
                  <h3 className="font-bold">{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-500 px-3 py-1 text-white rounded">Editar</button>
                    <button className="bg-red-500 px-3 py-1 text-white rounded">Eliminar</button>
                    <button
                      className="bg-gray-500 px-3 py-1 text-white rounded"
                      onClick={() => toggleProjectVisibility(project._id, project.status)}
                    >
                      {project.status === "publico" ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSection === "newProject" && <NewProjectForm fetchProjects={fetchProjects} />}
        {selectedSection === "clients" && <ClientsSection />}
        {selectedSection === "settings" && <HomeSettings />}
      </div>
    </div>
  );
};

export default AdminPanel;
