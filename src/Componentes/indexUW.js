import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

function Inicio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [publicNotes, setPublicNotes] = useState([]);
  const [loadingPublicNotes, setLoadingPublicNotes] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    setIsLoggedIn(!!usuarioGuardado);

    // Si el usuario está autenticado, obtener y establecer el nombre del usuario
    if (isLoggedIn) {
      const userData = JSON.parse(usuarioGuardado);
      setUserName(userData.nombre);
    }

    // Obtener noticias usando la API de News API
    const apiKey = '6b3a7f16460a4d7d863116d510ceead7';
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${apiKey}`;

    axios.get(newsUrl)
      .then(response => {
        const limitedNews = response.data.articles.slice(0,3);
        setNews(limitedNews);
        setLoadingNews(false);
      })
      .catch(error => {
        console.error('Error al obtener noticias:', error);
        setLoadingNews(false);
      });

    axios.get('http://localhost:8001/notas-publicas')  
      .then(response => {
        setPublicNotes(response.data);
        setLoadingPublicNotes(false);
      })
      .catch(error => {
        console.error('Error al obtener notas públicas:', error);
        setLoadingPublicNotes(false);
      });
  }, [isLoggedIn]);

  const handleEmpezarClick = () => {
    window.location.href ="/login";
    };

  const getRandomColor = () => {
    const colors = ['#FFDDC1', '#FFA48E', '#D4A5A5', '#9DBEBB', '#A3D2CA', '#C3E0CC'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Header />
        <div className="text-center mt-8">
          {isLoggedIn ? (
            <>
              <h1 className="custom-h1">¡Bienvenido de nuevo, {userName}!</h1>
              <h3 className="text-lg text-gray-600 mb-6">
                Tu compañero ideal para la vida estudiantil, laboral y de aprendizaje
              </h3>
              <p className="text-gray-700 mb-8">
                Ut Work está diseñado pensando en ti, ofreciéndote una manera accesible y fácil de tomar apuntes sobre temas importantes para tu desarrollo. Además, proporcionamos un calendario intuitivo que te ayudará a gestionar y recordar tus actividades pendientes de forma eficiente. ¡Descubre la comodidad de aprender y organizar tu vida con Ut Work!
              </p>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <h1>Notas Públicas</h1>
      {loadingPublicNotes && <p>Cargando notas públicas...</p>}
      <div className="public-notes-container">
        {publicNotes.map((nota) => (
          <div key={nota.idNota} className="public-note-card" style={{ backgroundColor: getRandomColor() }}>
            <div className="note-content">
              {nota.contenidoNota}
            </div>
            <div className="note-header">
              <div className='note-title-bg'>
                <div className="">
                  <h3 className="note-title">{nota.nombreNota}</h3>
                  <p className="note-author">Autor: {nota.autorNota}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1>Noticias sobre Ciencia</h1>
      {loadingNews && <p>Cargando noticias...</p>}
      <div className="news-container">
        {news.map((article) => (
          <div key={article.url} className="news-card" >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p>{article.source.name}</p>
              <a href={'/article'} target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
            <div className="news-image">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Inicio;
