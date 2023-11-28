import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './header';
import Footer from './footer';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegistro = async () => {
    try {
      const response = await axios.post('http://localhost:8001/registro', {
        email,
        contraseña: password,
        nombre,
      });
      console.log(response.data);
      // Manejar la respuesta del servidor según tus necesidades
      navigate('/login'); // Redirige a la página de inicio de sesión después del registro exitoso
    } catch (error) {
      console.error('Error al registrar:', error.response.data);
      setError('Error al registrar. Por favor, inténtalo de nuevo.');
    }
  };

  const handleGoogleLogin = (response) => {
    console.log(response);
    // Lógica para el inicio de sesión con Google
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Registrarse</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <input
            type="checkbox"
            checked={aceptoTerminos}
            onChange={() => setAceptoTerminos(!aceptoTerminos)}
          />
          <label>Acepto los términos y condiciones</label>
        </div>
        <button onClick={handleRegistro} disabled={!aceptoTerminos}>
          Registrarse
        </button>
        <p>¿Ya tienes cuenta?</p>
        <a href="/login">Iniciar Sesión</a>
        <GoogleLogin
          clientId="169218531051-cjabvo5a2o1qntlbqil2627dbgq1qu47.apps.googleusercontent.com"
          buttonText="Iniciar Sesión con Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Footer />
    </>
  );
};

export default Registro;
