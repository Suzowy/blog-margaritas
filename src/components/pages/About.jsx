

const About = () => {
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
    </>
  );
};

export default About
