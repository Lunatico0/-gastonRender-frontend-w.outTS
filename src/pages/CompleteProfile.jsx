import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

const CompleteProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/auth/update-profile", { name, email });
      setUser(data.user || null);  // 🔹 Evita errores si `user` es null
      navigate("/profile");
    } catch (error) {
      console.error("❌ Error actualizando perfil:", error.response ? error.response.data.message : error.message);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Completa tu Perfil</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 mb-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
