import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './header';
import Footer from './footer';

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [showEmptyFieldsModal, setShowEmptyFieldsModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const actualizarEstadoInicioSesion = (usuario) => {
    setUsuario(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const handleLogin = async () => {
    if (!email || !contraseña) {
      setShowEmptyFieldsModal(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8001/login', { email, contraseña });
  
      const responseData = response?.data;
  
      if (responseData && responseData.usuario) {
        actualizarEstadoInicioSesion(responseData.usuario);
  
        // Verificar si el usuario es administrador (tipo de usuario 2)
        if (responseData.usuario.TipoUsuario === 2) {
          navigate('/dashboart'); // Redirigir al panel de administrador
        } else {
          navigate('/'); // Redirigir a la página principal
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };
  
  const responseGoogle = (response) => {
    if (!response || !response.tokenId) {
      return;
    }

    iniciarSesionConGoogle(response.tokenId);
  };

  const iniciarSesionConGoogle = async (tokenId) => {
    try {
      const googleResponse = await axios.post('http://localhost:8001/google-login', {
        tokenId: tokenId,
      });
      console.log(googleResponse.data);
      actualizarEstadoInicioSesion(googleResponse.data.usuario);
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error.response.data);
      setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
    }
  };

  const closeModal = () => {
    setShowEmptyFieldsModal(false);
  };

  // Cambiado: Cargar el usuario desde el localStorage al montar el componente
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={!!usuario} />
      <div className="container">
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {usuario ? (
          <p>Bienvenido, {usuario.nombre}!</p>
        ) : (
          <>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Contraseña:</label>
              <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Iniciar Sesión</button>
            <p>¿No tienes cuenta?</p>
            <Link to="/Registro">Registrarse</Link>
            <GoogleLogin
              clientId="169218531051-cjabvo5a2o1qntlbqil2627dbgq1qu47.apps.googleusercontent.com"
              buttonText="Iniciar Sesión con Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </>
        )}
      </div>
      <Footer />
      {showEmptyFieldsModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Rellena todos los campos antes de continuar.</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default InicioSesion;
