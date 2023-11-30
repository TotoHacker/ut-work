import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Componentes/indexUW';
import './App.css';
import Registro from './Componentes/registrese';
import Login from './Componentes/inicioSesion';
import NotaPu from './Componentes/notasP'; 
import TermsAndConditions from './Componentes/terminos';
import NotaNew from './Componentes/newNota';
import InteNotaN from './Componentes/notasN';
import AdminUsuarios from './Componentes/dash';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/notaP" element={<NotaPu />} /> 
        <Route path="/notaN" element={<NotaNew />} /> 
        <Route path="/terminos" element={<TermsAndConditions/>} /> 
        <Route path="/mis-notas" element={<InteNotaN/>} /> 
        <Route path="/dashboart" element={<AdminUsuarios/>} /> 
      </Routes>
    </Router>
  );
}
export default App;
