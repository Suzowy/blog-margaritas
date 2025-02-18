import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

// Función para formatear la fecha en el sidebar
const formatFecha = (fecha) => {
  if (!fecha) return ""; // Verificar si la fecha existe
  const date = new Date(fecha);
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
};

const Sidebar = ({ articulos = [] }) => {
  const navegar = useNavigate();
  const [mostrarTodo, setMostrarTodo] = useState(false);
  const [cargando, setCargando] = useState(true);  // Agregado estado de carga

  useEffect(() => {
    if (articulos.length > 0) {
      setCargando(false);  // Cuando los artículos llegan, ponemos cargando en false
    }
  }, [articulos]);  // Dependencia en los artículos

  const hacerBusqueda = (e) => {
    e.preventDefault();
    let mi_busqueda = e.target.search_field.value;
    navegar("/buscar/" + mi_busqueda, { replace: true });
  };

  // Mostrar los primeros 10 artículos si no está desplegado
  const articulosAMostrar = mostrarTodo ? articulos : articulos.slice(0, 5);

  console.log("Total de artículos:", articulos.length);  // Depuración

  return (
    <aside className="lateral">
      <div className="search">
        <h2 className="title">Buscador</h2>
        <form onSubmit={hacerBusqueda}>
          <input type="text" name="search_field" />
          <button type="submit" id="search">Buscar</button>
        </form>
      </div>

      {/* Mostrar títulos de los artículos */}
      <>
        <div className="ultimos-articulos">
          <h2>Últimos Artículos</h2>
          {cargando ? (  // Mostrar cargando mientras los artículos no estén listos
            <p>Cargando...</p>
          ) : (
            articulosAMostrar.length > 0 ? (
              <ul>
                {articulosAMostrar.map((articulo) => (
                  <li key={articulo._id}>
                    <Link to={`/articulo/${articulo._id}`} key={articulo._id}>
                      <h3>{articulo.titulo}</h3>
                    </Link>

                    {/* Mostrar la fecha con la función formatFecha */}
                    {articulo.fecha && <h4>{formatFecha(articulo.fecha)}</h4>}
                  </li>
                ))}

              </ul>
            ) : (
              <p>No hay artículos recientes.</p>
            )
          )}

          {/* Botón para mostrar todos los artículos */}
          {articulos.length > 5 && !mostrarTodo && (
            <button
              className="ver-mas"
              onClick={() => setMostrarTodo(true)}
            >
              Ver todo
            </button>
          )}

          {/* Botón para volver a mostrar solo 10 artículos */}
          {mostrarTodo && (
            <button
              className="ver-menos"
              onClick={() => setMostrarTodo(false)}
            >
              Ver menos
            </button>
          )}
        </div>
      </>
      <h2>¿Quienes somos?</h2>
      <section className="section about">
     
        <div className="texto-left">

          <div className="foto-about">
            <img
              className="foto"
              src="/img/nosotras.jpeg"
              alt="foto de nosotras"
            />
          </div>
          <p>
            Somos M. y M. Lectoras empedernidas y amantes de todo lo hogareño que nos transmita calma
            y paz. Por eso coleccionamos tazas, bufandas y adornos navideños. Viajamos para probar
            buenos platos y comprar buenas historias. Atentas a los pequeños detalles que nos hacen
            sonreír, preferimos regalar a que nos regalen. Por lo general, se nos puede encontrar en
            alguna cafetería tomando chocolate caliente o perdidas en librerías con encanto donde no
            existe el concepto tiempo.
          </p>
          <br />



        </div>
      </section>
    </aside>
  );
};

Sidebar.propTypes = {
  articulos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired, // Asegúrate de que el artículo tiene este campo
    })
  ),
};

export default Sidebar;
