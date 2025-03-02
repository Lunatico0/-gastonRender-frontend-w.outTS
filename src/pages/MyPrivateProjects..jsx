import { useState, useEffect, useContext } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

const MyPrivateProjects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchPrivateProjects();
  }, []);

  const fetchPrivateProjects = async () => {
    try {
      const { data } = await api.get("/projects/my-private-projects");
      setProjects(data);
    } catch (error) {
      console.error("❌ Error obteniendo proyectos privados:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Proyectos Privados</h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">No tienes proyectos privados asignados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="p-4 border rounded shadow">
              {project.images.map((img, index) => (
                <img key={index} src={img.url} alt="Proyecto" className="w-full h-40 object-cover mb-2" />
              ))}
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrivateProjects;
