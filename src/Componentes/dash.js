import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  
  useEffect(() => {
    fetchUsuarios();
    fetchTotalUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    
    try {
      const response = await axios.get('http://localhost:8001/usuarios');
      

      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchTotalUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8001/total-usuarios');
      setTotalUsuarios(response.data.total);
    } catch (error) {
      console.error('Error al obtener el total de usuarios:', error);
    }
  };

  const handleNombreChange = (userId, newName) => {
    // Crear una nueva lista de usuarios con el nombre actualizado
    const updatedUsuarios = usuarios.map((usuario) =>
      usuario.Id_usuario === userId ? { ...usuario, nombre_usuario: newName } : usuario
    );
    // Actualizar el estado local con la nueva lista de usuarios
    setUsuarios(updatedUsuarios);
  };

  const handleCorreoChange = (userId, newEmail) => {

    const updatedUsuarios = usuarios.map((usuario) =>
      usuario.Id_usuario === userId ? { ...usuario, email_usuario: newEmail } : usuario
    );
    // Actualizar el estado local con la nueva lista de usuarios
    setUsuarios(updatedUsuarios);
  };

  const handleGuardarCambios = async (userId) => {
    try {
      // Obtener el usuario actual
      const usuarioActual = usuarios.find((usuario) => usuario.Id_usuario === userId);

      // Enviar la solicitud para actualizar la información del usuario
      await axios.put(`http://localhost:8001/actualizar-usuario/${userId}`, {
        nombre: usuarioActual.nombre_usuario,
        correo: usuarioActual.email_usuario,
      });
      alert('Usuario actualizado');
      fetchUsuarios();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleEliminarUsuario = async (userId, tipoUsuario) => {
    try {

      if (tipoUsuario === 2) {
        alert('No puedes eliminar a un administrador.');
        return;
      }

      await axios.delete(`http://localhost:8001/eliminar-usuario/${userId}`);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.Id_usuario !== userId));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p>Total de Usuarios: {totalUsuarios}</p>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.Id_usuario}>
              <div>
                <strong>ID:</strong> {usuario.Id_usuario}
              </div>
              <div>
                <strong>Nombre:</strong>{' '}
                <input
                  type="text"
                  value={usuario.nombre_usuario}
                  onChange={(e) => handleNombreChange(usuario.Id_usuario, e.target.value)}
                />
              </div>
              <div>
                <strong>Correo:</strong>{' '}
                <input
                  type="text"
                  value={usuario.email_usuario}
                  onChange={(e) => handleCorreoChange(usuario.Id_usuario, e.target.value)}
                />
              </div>
              <div>
                <button onClick={() => handleGuardarCambios(usuario.Id_usuario)}>Guardar</button>
                <button
                  onClick={() => handleEliminarUsuario(usuario.Id_usuario, usuario.TipoUsuario)}
                  disabled={usuario.TipoUsuario === 2}
                  hidden={usuario.TipoUsuario === 2}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
