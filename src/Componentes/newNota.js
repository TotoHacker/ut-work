import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import axios from 'axios';

const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

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
  const [wordToSearchDictionary, setWordToSearchDictionary] = useState('');
  const [dictionaryResult, setDictionaryResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cargar usuario desde localStorage al montar el componente
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleSaveNote = async () => {
    if (!usuario || !noteTitle || !noteContent) {
      // Cambiado de alert a showModal
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8001/guardar-nota', {
        noteTitle,
        noteContent,
        userId: usuario.Id_usuario,
      });

      if (response.status === 201) {
        window.location.href = "/mis-notas";
        // Cambiado de alert a showModal
        setShowModal(true);
      } else {
        // Cambiado de alert a showModal
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      // Cambiado de alert a showModal
      setShowModal(true);
    }
  };

  const handleNoteTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleWordSearchDictionaryChange = (event) => {
    setWordToSearchDictionary(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await fetch(`${DICTIONARY_API_URL}${wordToSearchDictionary}`);
        const data = await response.json();

        if (data && data.length > 0) {
          const result = {
            word: data[0].word,
            phonetic: data[0].phonetic,
            meanings: data[0].meanings.map((meaning) => ({
              partOfSpeech: meaning.partOfSpeech,
              definitions: meaning.definitions.map((definition) => ({
                definition: definition.definition,
                example: definition.example,
                synonyms: definition.synonyms,
                antonyms: definition.antonyms,
              })),
            })),
          };

          setDictionaryResult(result);
        } else {
          console.error('La respuesta de la API de diccionario no es la esperada.');
        }
      } catch (error) {
        console.error('Error al obtener definición del diccionario', error);
      }
    };

    if (wordToSearchDictionary) {
      fetchDictionary();
    }
  }, [wordToSearchDictionary]);

  useEffect(() => {
    // Crear el script de Google Custom Search
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=77d09c06e206e49b7';
    script.async = true;
    script.defer = true;

    // Manejar la carga del script
    script.onload = () => {
      if (window.google && window.google.search) {
        // Lógica adicional si es necesario
        window.google.search.cse.element.render({
          div: "gcse-search",
          gname: "gsearch",
          tag: "searchresults-only",
          attributes: { enableHistory: true },
        });
      } else {
        console.error('La API de Google Custom Search no se cargó correctamente.');
        // Puedes manejar este caso de manera adecuada, por ejemplo, mostrando un mensaje de error.
      }
    };

    // Manejar errores de carga del script
    script.onerror = (error) => {
      console.error('Error al cargar el script de Google Custom Search:', error);
      // Puedes manejar este caso de manera adecuada, por ejemplo, mostrando un mensaje de error.
    };

    // Adjuntar el script al final del cuerpo del documento
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Header />
      {showModal && (
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
            <h1>
              <input
                type="text"
                placeholder="Nombre de la nota"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
            </h1>
            <textarea
              placeholder="Escribe tu nota"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
        </article>
        <button onClick={handleSaveNote}>
          Guardar Nota
        </button>
      </div>
      <div className="container3-left">
        <article className="noteContainer2">
          <div className="noteContent2">
            <h1>Soy tu diccionario</h1>
            <a className='text-center'>¿Qué palabra buscas?</a>
            <input
              type='text'
              placeholder='Escribe lo que deseas buscar'
              value={wordToSearchDictionary}
              onChange={handleWordSearchDictionaryChange}
            />
            <div>
              <h4>Definición del diccionario:</h4>
              {dictionaryResult !== null && wordToSearchDictionary.trim() !== '' && (
                <div>
                  <p>Palabra: {dictionaryResult.word}</p>
                  <p>Fonética: {dictionaryResult.phonetic}</p>
                  {dictionaryResult.meanings.map((meaning, index) => (
                    <div key={index}>
                      <p>{meaning.partOfSpeech}</p>
                      {meaning.definitions.map((definition, index) => (
                        <div key={index}>
                          <p>Definición: {definition.definition}</p>
                          <p>Ejemplo: {definition.example}</p>
                          <p>Sinónimos: {definition.synonyms.join(', ')}</p>
                          <p>Antónimos: {definition.antonyms.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
      <div className="container4-left">
        <article className="noteContainer2">
          <div className="noteContent">
            <h1>Hola, Buen día</h1>
            <a className='text-center'>¿En qué te puedo ayudar?</a>
            <div className="gcse-search"></div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}

export default NotaNew;
