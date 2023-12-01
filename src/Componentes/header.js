// Header.js
import React, { useState, useEffect } from 'react';
import UTWorkImage from '../Imagenes/UTWork.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    setIsLoggedIn(!!usuarioGuardado);
  }, []);

  const logout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    // Recargar la página después de cerrar sesión
    window.location.reload();
  };

  return (
    <header className="custom-header">
      <div className="logo-container">
        <a href='/'>
          <img
            src={UTWorkImage}
            alt="Logo"
            className="logo"
          />
        </a>
      </div>
      <nav className="nav-links">
        {isLoggedIn ? (
          <>
            <a href="/mis-notas" className="nav-link">
              Mis notas
            </a>
            <a href="/" className="nav-link">
              Notas Públicas
            </a>
            <span className="nav-link" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} href='/'/> Cerrar Sesión
            </span>
          </>
        ) : (
          <>
            <a href="/login" className="nav-link">
              Iniciar sesión
            </a>
            <a href="/" className="nav-link">
              Notas Públicas
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
