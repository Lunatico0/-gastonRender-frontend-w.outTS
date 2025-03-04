import { useState } from "react";
import api from "../api/api";

const NewProjectForm = ({ fetchProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("nueva_construccion");
  const [status, setStatus] = useState("publico");
  const [client, setClient] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generar vista previa de imágenes
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
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
      if (status === "privado" && client) {
        formData.append("clientId", client);
      }
      images.forEach((image) => formData.append("images", image));

      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProjects();
    } catch (error) {
      console.error("❌ Error creando proyecto:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuevo Proyecto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <label className="block text-gray-700 font-medium">Título</label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          placeholder="Título del proyecto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Descripción */}
        <label className="block text-gray-700 font-medium">Descripción</label>
        <textarea
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          placeholder="Descripción del proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* Categoría */}
        <label className="block text-gray-700 font-medium">Categoría</label>
        <select
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="nueva_construccion">Nueva Construcción</option>
          <option value="remodelacion_completa">Remodelación Completa</option>
          <option value="espacio_especifico">Espacio Específico</option>
        </select>

        {/* Estado */}
        <label className="block text-gray-700 font-medium">Estado</label>
        <select
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>

        {/* Cliente (solo si es privado) */}
        {status === "privado" && (
          <>
            <label className="block text-gray-700 font-medium">Asignar Cliente</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="ID del cliente"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </>
        )}

        {/* Subida de Imágenes */}
        <label className="block text-gray-700 font-medium">Subir Imágenes</label>
        <input
          type="file"
          multiple
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          onChange={handleImageChange}
        />

        {/* Vista previa de imágenes */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt="Preview" className="w-full h-20 object-cover rounded" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded transition duration-200 hover:bg-blue-600 active:scale-95"
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;
