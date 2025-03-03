import { useState, useContext, useEffect } from "react";
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
  const [clients, setClients] = useState([]);  // 🔹 Lista de clientes
  const [selectedClient, setSelectedClient] = useState("");  // 🔹 Cliente seleccionado
  const [tempEmail, setTempEmail] = useState("");
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await api.get("/auth/clients");  // 🔹 Nueva ruta para obtener clientes
      setClients(data);
    } catch (error) {
      console.error("❌ Error obteniendo clientes:", error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/create-user", { name: tempName, email: tempEmail, role: "cliente" });

      console.log("🔐 Contraseña temporal:", data.tempPassword);
      alert(`Usuario creado con éxito.\n\n📧 Email: ${tempEmail}\n🔑 Contraseña: ${data.tempPassword}\n\nRecuerda compartir estos datos con el cliente.`);

      setTempName("");
      setTempEmail("");
      fetchClients(); // 🔹 Recargar lista de clientes
    } catch (error) {
      console.error("❌ Error creando usuario:", error.response ? error.response.data : error.message);
    }
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

      if (status === "privado" && selectedClient) {
        formData.append("clientId", selectedClient);
      }

      images.forEach((image) => {
        formData.append("images", image);
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
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      {/* 🔹 Formulario para crear un nuevo usuario cliente */}
      <div className="p-4 border rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">Crear Usuario Cliente</h3>
        <form onSubmit={handleCreateUser}>
        <input
            type="text"
            placeholder="Nombre del Cliente"
            className="w-full p-2 mb-2 border rounded"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo Electrónico del Cliente"
            className="w-full p-2 mb-2 border rounded"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            required
          />
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded mt-2">
            Crear Cliente
          </button>
        </form>
      </div>

      {/* 🔹 Formulario para crear un nuevo proyecto */}
      <h3 className="text-xl font-semibold mb-2">Nuevo Proyecto</h3>
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

        <select
          className="w-full p-2 mb-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>

        {status === "privado" && (
          <select
            className="w-full p-2 mb-2 border rounded"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Seleccionar cliente</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.name || client.email}</option>
            ))}
          </select>
        )}

        <input type="file" multiple className="w-full p-2 mb-2 border rounded" onChange={handleImageChange} />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
