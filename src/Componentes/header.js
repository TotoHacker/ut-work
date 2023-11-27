import React from 'react';
import UTWorkImage from '../Imagenes/UTWork.png';  // Ajusta la ruta según la ubicación real de tu imagen

function Header() {
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
        <a href="/login" className="nav-link">
          Iniciar sesión
        </a>
        <a href="/" className="nav-link">
          Notas Públicas
        </a>
      </nav>
    </header>
  );
}

export default Header;
