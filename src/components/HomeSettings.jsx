import React, { useState } from 'react'
import api from '../api/api.js';

const HomeSettings = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    try {
      await api.put("/home", { title, description });
      alert("Configuración guardada");
    } catch (error) {
      console.error("❌ Error actualizando Home:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Configurar Home</h2>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <button onClick={handleSave} className="w-full p-2 bg-green-500 text-white rounded">Guardar Cambios</button>
    </div>
  );
};


export default HomeSettings
