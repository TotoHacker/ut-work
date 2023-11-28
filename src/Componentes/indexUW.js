import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header'; // Asegúrate de que la ruta sea correcta y coincida con el nombre del archivo
import Footer from './footer';
function Inicio() {
  const navigate = useNavigate();

  const handleEmpezarClick = () => {
    navigate('/login');
  };

    const getRandomColor = () => {
      const colors = ['#FFDDC1', '#FFA48E', '#D4A5A5', '#9DBEBB', '#A3D2CA', '#C3E0CC'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
  
  const noteColor = getRandomColor();
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Header />
      <div className="text-center mt-8">
        <h1 className="custom-h1">Bienvenido a Ut Work</h1>
        <h3 className="text-lg text-gray-600 mb-6">
          Tu compañero ideal para la vida estudiantil, laboral y de aprendizaje
        </h3>
        <p className="text-gray-700 mb-8">
          Ut Work está diseñado pensando en ti, ofreciéndote una manera accesible y fácil de tomar apuntes sobre temas importantes para tu desarrollo. Además, proporcionamos un calendario intuitivo que te ayudará a gestionar y recordar tus actividades pendientes de forma eficiente. ¡Descubre la comodidad de aprender y organizar tu vida con Ut Work!
        </p>
        <button className="custom-button" onClick={handleEmpezarClick}>
          Empezar a tomar nota
        </button>
      </div>
    </div>

    <h1>Notas Publicas</h1>
    <div className="public-note-card" style={{ backgroundColor: noteColor }}>
    <div className="note-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </div>
      <div className="note-header">
        <div className='note-title-bg'>
        <div className="">
          <h3 className="note-title">Nombre de la Nota</h3>
        </div>
        <p className="note-author">Autor: Nombre del Autor</p>
      </div>
      </div>
    </div>
    
    <Footer></Footer>
    </>
  );
}

export default Inicio;
 