// notaPu.js
import React from 'react';
import Header from './header';
import Footer from './footer';


function NotaPublica() {
  const noteContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  return (
    <>
      <Header />
      <div className="container2">
        <article className="noteContainer">
          <h2 className="noteTitle">Título de la Nota</h2>
          <h4 className="">Autor:</h4>
          <div className="noteContent">
            {noteContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}

export default NotaPublica;
