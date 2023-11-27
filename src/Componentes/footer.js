import React from 'react';
import UTWorkImage from '../Imagenes/UTWork.png';  // Ajusta la ruta según la ubicación real de tu imagen


function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <nav className="nav-links">
        <a href="/" className="nav-link">
          UTWork
        </a>
        <a href="/terminos" className="nav-link">
          Términos y Condiciones
        </a>
        <a href="/contacto" className="nav-link">
          Contacto
        </a>
      </nav>
      <div className="footer-info">
        <p>&copy; {year} UTWork. Todos los derechos reservados.</p>
        <p>Plataforma para compartir notas públicas.</p>
      </div>
    </footer>
  );
}

export default Footer;
