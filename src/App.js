
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Componentes/indexUW';
import './App.css';
import Registro from './Componentes/registrese';
import Login from './Componentes/inicioSesion';
import NotaPu from './Componentes/notasP'; 
import TermsAndConditions from './Componentes/terminos';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/notaP" element={<NotaPu />} /> 
        <Route path="/terminos" element={<TermsAndConditions/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
