import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

const InteNotaN = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCrearNuevaNotaClick = () => {
    window.location.href = "/notaN";
  };

  const fetchNotes = async () => {
    try {
      const usuarioGuardado = localStorage.getItem('usuario');
      const userId = usuarioGuardado ? JSON.parse(usuarioGuardado).Id_usuario : null;

      if (userId) {
        setLoading(true);
        const response = await axios.get(`http://localhost:8001/buscar-notas?userId=${userId}`);
        setNotes(response.data);
      } else {
        window.location.href = "/";
        alert("Inicie sesión para desbloquear las funcionalidades");
      }
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubirNotaClick = async () => {
    try {
      if (!loading && selectedNote) {
        const usuarioGuardado = localStorage.getItem('usuario');
        const Id_usuario_Id = usuarioGuardado ? JSON.parse(usuarioGuardado).Id_usuario : null;

        if (!Id_usuario_Id || !selectedNote.IdNota || !selectedNote.nombreNota || !selectedNote.contenidoNota) {
          console.error('Falta información necesaria para subir la nota.');
          return;
        }

        const { IdNota, nombreNota, contenidoNota } = selectedNote;
        const autorNota = JSON.parse(usuarioGuardado).email_usuario;

        setLoading(true);

        await axios.post('http://localhost:8001/subir-nota', {
          IdNota,
          nombreNota,
          contenidoNota,
          autorNota,
          Id_usuario_Id
        });

        setShowSuccessModal(true);
        await fetchNotes();
      }
    } catch (error) {
      console.error('Error al subir la nota:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleModalOkClick = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Header />

      {loading && (
        <div className="loading-modal">
          <div className="loader"></div>
          <p>Cargando...</p>
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal">
          <p>Nota subida con éxito</p>
          <button onClick={handleModalOkClick}>OK</button>
        </div>
      )}
    <div></div>
      <div
        className="create-note-card"
        onClick={handleCrearNuevaNotaClick}
      >
        <div className="note-content"></div>
        <div className="note-header">
          <div className='note-title-bg'>
            <div className="">
              <h3 className="note-title">+ Crear nueva nota</h3>
            </div>
          </div>
        </div>
      </div>

      <h1>Mis notas</h1>

      {notes.map((note) => (
        <div
          key={note.IdNota}
          className="personal-note-card"
          onClick={() => setSelectedNote(note)}
        >
          <div className="note-content">
            <h3>{note.nombreNota}</h3>
          </div>
          <button onClick={handleSubirNotaClick}>Subir Nota</button>
        </div>
      ))}

      <Footer />
    </>
  );
};

export default InteNotaN;
