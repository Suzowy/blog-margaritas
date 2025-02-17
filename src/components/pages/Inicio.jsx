import { useState } from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
    <div className='portada'>
     
        <blockquote>
          Un lugar donde compartir la belleza de las pequeñas cosas y soñar con la próxima aventura
        </blockquote>
        {/* <Link to="/articulos" className="button">Ver los articulos</Link> */}
     

      <div className="foto-portada">
        {!isImageLoaded && <div className="loader">Cargando imagen...</div>}
        <img
          className="foto"
          src="img\portada-margaritas.jpg"
          alt="foto de un libro con margaritas"
          onLoad={handleImageLoad}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />

        
      </div>

    </div>

<section>
          <div className="manifiesto">
            <h2>Nuestro manifiesto:</h2>
            <ul>
              <li>
                Creemos en las buenas historias, esas que te atrapan desde el principio y no puedes
                dejar de leer.
              </li>
              <br />
              <li>
                Creemos que las bebidas calientes servidas en tazas bonitas arropan a las personas
                como una manta de patchwork; no soluciona los problemas pero te hace sentir un
                poquito mejor.
              </li>
              <br />
              <li>Creemos que la belleza nos salva. La literatura, también.</li>
              <br />
              <li>
                Creemos en la nostalgia como refugio de los momentos pasados donde fuimos felices.
                No podemos vivir eternamente en ellos pero suponen un bote salvavidas para los días
                de tormenta.
              </li>
              <br />
              <li>
                Creemos en los libros en papel porque suponen una experiencia totalmente distinta la
                de pasar las página con el dedo, anotar y subrayar lo que nos ha llamado la atención
                para volver a releerlo siempre que lo necesitemos. Además, los digitales no se pueden
                oler, no guardan flores en su interior o muestran los rastros de lágrimas o de café. No,
                solo los libros reales hacen esas cosas.
              </li>
              <br />
              <li>
                Creemos en disfrutar de los pequeños momentos que nos aportan felicidad, ya sea
                observando el fuego de la chimenea, paseando por la naturaleza, cuidando tus plantas
                o leyendo un libro.
              </li>
              <br />
              <li>
                Creemos que los libros están vivos porque te hacen sentir, pensar y avanzar. Quienes
                leen, viven más de una vida, viven tantas como historias caigan en sus manos. Y esa es
                una bonita manera de aprovechar el tiempo que estamos aquí.
              </li>
            </ul>
            <Link to="/articulos" className="button">Ver los articulos</Link>
          </div>
         
        </section>
</>
  );
};

export default Inicio;
