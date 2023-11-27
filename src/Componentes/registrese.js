// Registro.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './header';
import Footer from './footer';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Validar que el checkbox de términos y condiciones esté marcado antes de habilitar el botón de registro
    const isValid = email && password && nombre && confirmarPassword && aceptoTerminos;
    setError('');
    // Puedes agregar más validaciones según tus necesidades

    if (isValid) {
      // Habilitar el botón de registro
    } else {
      // Deshabilitar el botón de registro
    }
  }, [email, password, nombre, confirmarPassword, aceptoTerminos]);

  const handleRegistro = async () => {
    try {
      if (password !== confirmarPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      if (!aceptoTerminos) {
        setError('Debes aceptar los términos y condiciones para registrarte.');
        return;
      }

      const response = await axios.post('http://localhost:8081/registro', {
        email_usuario: email,
        contraseña_usuario: password,
        nombre_usuario: nombre,
      });

      if (response.data && response.data.Estatus === "OK") {
        navigate('/login');
      } else {
        setError('Hubo un problema al registrar la cuenta. Por favor, verifica tus datos.');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      setError('Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente.');
    }
  };

  const handleGoogleLogin = (response) => {
    console.log(response);
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
          <input type="password" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} />
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
