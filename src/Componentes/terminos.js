import React from 'react';
import Header from './header';
import Footer from './footer';

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="terms-container">
        <h1>Términos y Condiciones</h1>

        <section>
          <h2>1. Aceptación de Términos</h2>
          <p>
            Al acceder y utilizar este sitio web, aceptas estar sujeto a estos Términos y Condiciones.
            Si no estás de acuerdo con alguno de los términos establecidos, no uses este sitio.
          </p>
        </section>

        <section>
          <h2>2. Uso del Sitio</h2>
          <p>
            2.1. El contenido de las páginas de este sitio web es solo para tu información general y uso.
            Está sujeto a cambios sin previo aviso.
          </p>
          <p>
            2.2. Ni nosotros ni terceros ofrecemos garantía alguna en cuanto a la precisión, puntualidad,
            rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos
            en este sitio para un propósito particular. Tú reconoces que dicha información y materiales
            pueden contener inexactitudes o errores, y excluimos expresamente la responsabilidad por tales
            inexactitudes o errores en la máxima medida permitida por la ley.
          </p>
        </section>

        <section>
          <h2>3. Propiedad Intelectual</h2>
          <p>
            3.1. Este sitio web contiene material que es propiedad nuestra o licenciado para nosotros.
            Este material incluye, pero no se limita a, el diseño, el diseño, la apariencia, y los gráficos.
            La reproducción está prohibida salvo de acuerdo con el aviso de copyright, que forma parte de estos términos y condiciones.
          </p>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
