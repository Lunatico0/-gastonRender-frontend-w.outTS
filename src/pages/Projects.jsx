import { useState, useEffect, useContext } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error obteniendo proyectos:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="p-4 border rounded shadow">
            {project.images.map((img, index) => (
              <img key={index} src={img.url} alt={project.title} className="w-full h-40 object-cover mb-2" />
            ))}
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Projects;
