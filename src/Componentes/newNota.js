import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';

// Componente de Modal básico (Modal.js)
const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

function NotaNew() {
  const [modalOpen, setModalOpen] = useState(true);
  const [noteTitle, setNoteTitle] = useState('');

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleNoteTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const noteContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  return (
    <>
      <Header />
      {modalOpen && (
        <Modal onClose={handleModalClose}>
          <h4>Nombre de la nota:</h4>
            
            <input
              type="text"
              value={noteTitle}
              onChange={handleNoteTitleChange}
            />
          
          <button onClick={handleModalClose}>Guardar</button>
        </Modal>
      )}
      <div className="container3">
        <article className="noteContainer1">
          <div className="noteContent1">
            <h1>{noteTitle || 'Título por defecto'}</h1>
            {noteContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
      <div className="container3-left">
        <article className="noteContainer2">
          <div className="noteContent2">
            <h1>Soy tu diccionario</h1>
            <a className='text-center'>¿Qué palabra buscas?</a>
            <input type='text' placeholder='Escribe lo que desaeas buscar'></input>
          </div>
        </article>
      </div>
      <div className="container4-left">
        <article className="noteContainer2">
          <div className="noteContent">
            <h1>Hola, Buen día</h1>
            <a className='text-center'>¿En qué te puedo ayudar?</a>
            <input type='text' placeholder='Escribe lo que desaeas buscar'></input>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}

export default NotaNew;
