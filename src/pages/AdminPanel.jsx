import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("nueva_construccion");
  const [status, setStatus] = useState("publico");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // 🔹 Guardar múltiples imágenes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (images.length === 0) {
        console.error("❌ Debes subir al menos una imagen.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("status", status);

      // Asegurarse de que las imágenes sean enviadas correctamente
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Proyecto creado:", response.data);
      navigate("/projects");
    } catch (error) {
      console.error("❌ Error creando proyecto:", error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Nuevo Proyecto</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 mb-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          className="w-full p-2 mb-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-2 mb-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="nueva_construccion">Nueva Construcción</option>
          <option value="remodelacion_completa">Remodelación Completa</option>
          <option value="espacio_especifico">Espacio Específico</option>
        </select>

        {/* Subida de múltiples imágenes */}
        <input type="file" multiple className="w-full p-2 mb-2 border rounded" onChange={handleImageChange} />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
