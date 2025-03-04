import React, { useEffect, useState } from 'react'
import api from '../api/api.js';

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await api.get("/auth/clients");
      setClients(data);
    } catch (error) {
      console.error("❌ Error obteniendo clientes:", error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/create-user", { name: tempName, email: tempEmail, role: "cliente" });
      alert(`Usuario creado con éxito. Contraseña: ${data.tempPassword}`);
      fetchClients();
    } catch (error) {
      console.error("❌ Error creando usuario:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <form onSubmit={handleCreateUser} className="p-4 border rounded shadow-md">
        <input type="text" placeholder="Nombre" value={tempName} onChange={(e) => setTempName(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <input type="email" placeholder="Correo" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Crear Cliente</button>
      </form>
    </div>
  );
};


export default ClientsSection
