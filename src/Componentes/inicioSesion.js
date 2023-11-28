import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './header';
import Footer from './footer';

const Modal = ({ onClose, children }) => (
  <div className="modal">
    <div className="modal-content">
      {children}
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [showEmptyFieldsModal, setShowEmptyFieldsModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !contraseña) {
      // Muestra el modal si los campos están vacíos
      setShowEmptyFieldsModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8001/login', { email, contraseña });
      console.log('Respuesta del servidor:', response);

      const responseData = response?.data;
      console.log('Datos de la respuesta:', responseData);

      if (responseData && responseData.algunaPropiedad) {
        // Lógica para manejar los datos de la respuesta
      }

      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      console.log('Respuesta de Google:', response);
  
      if (response && response.profileObj && response.profileObj.email && response.profileObj.googleId) {
        const { profileObj: { email, googleId } } = response;
  
        // Envía la información al backend para el inicio de sesión con Google
        const googleResponse = await axios.post('http://localhost:8001/google-login', {
  email,
  googleId,
}).catch(error => {
  console.error('Error en la solicitud al backend:', error);
});
        console.log('Respuesta del servidor (Google):', googleResponse.data);
  
        // Aquí puedes realizar cualquier lógica adicional después del inicio de sesión con Google
  
        // Navega a la página principal u otra página según tus necesidades
        navigate('/');
      } else {
        console.error('La respuesta de Google no tiene la estructura esperada.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
      // Manejo de errores, si es necesario
    }
  };
  

  const closeModal = () => {
    setShowEmptyFieldsModal(false);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Iniciar Sesión</button>

        <GoogleLogin
          clientId="422438807143-dke378kffnlr3i1qor0ejnsr5unr25gm.apps.googleusercontent.com"
          buttonText="Iniciar Sesión con Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={'single_host_origin'}
        />
        <p>¿No tienes cuenta?</p>
        <a href="/Registro">Registrarse</a>
      </div>
      <Footer />
      {showEmptyFieldsModal && (
        <Modal onClose={closeModal}>
          <p>Rellena todos los campos antes de continuar.</p>
        </Modal>
      )}
    </>
  );
};

export default InicioSesion;
