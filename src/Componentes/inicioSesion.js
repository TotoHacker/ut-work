import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './header';
import Footer from './footer';

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/inicio-sesion', {
        emailUsuario: email,
        passwordUsuario: contraseña,
      });

      if (response.data && response.data.Estatus === 'OK') {
        navigate('/');
      } else {
        setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      setError('Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente.');
    }
  };

  const handleGoogleLogin = (response) => {
    console.log(response);
    // Implementa la lógica para manejar el inicio de sesión con Google
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
          clientId="169218531051-cjabvo5a2o1qntlbqil2627dbgq1qu47.apps.googleusercontent.com"
          buttonText="Iniciar Sesión con Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={'single_host_origin'}
        />
        <p>¿No tienes cuenta?</p>
        <a href="/Registro">Registrarse</a>
      </div>
      <Footer />
    </>
  );
};

export default InicioSesion;
