import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazamos al inicio de la página cuando se visita About
  }, []);

  return (
    <>
      {/* Sección Algo más sobre nosotras */}
      <section className="about">
        <div className="texto-left">
          <h2>¿Quienes somos?</h2>
          <p>
            Somos M. y M. Lectoras empedernidas y amantes de todo lo hogareño que nos transmita calma
            y paz. Por eso coleccionamos tazas, bufandas y adornos navideños. Viajamos para probar
            buenos platos y comprar buenas historias. Atentas a los pequeños detalles que nos hacen
            sonreír, preferimos regalar a que nos regalen. Por lo general, se nos puede encontrar en
            alguna cafetería tomando chocolate caliente o perdidas en librerías con encanto donde no
            existe el concepto tiempo.
          </p>
          <br />
          <h2>Algo más sobre nosotras</h2>
          <div className="foto-about">
            <img
              className="foto"
              src="/img/nosotres.png"
              alt="foto de nosotras"
            />
          </div>
          <p>
            Queremos vivir en un mundo en el que esté normalizado pasar un duelo al acabar un libro,
            que tu crush sea un personaje literario y que todos los días sean el día del libro. Un
            mundo donde al tener un día malo puedas ir a tu librería de confianza para que te receten
            la novela para sentirte mejor. Sería maravilloso.
          </p>
          <br />
        </div>
      </section>
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

export default About;
