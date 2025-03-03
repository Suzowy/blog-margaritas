import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const formatFecha = (fecha) => {
  if (!fecha) return "";
  const date = new Date(fecha);
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
};

// Mapeo de nombres de meses a sus índices
// eslint-disable-next-line no-unused-vars
const meses = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const Sidebar = ({ articulos = [] }) => {
  const navegar = useNavigate();
  const [mostrarTodo, setMostrarTodo] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    if (articulos.length > 0) {
      setCargando(false);
      setResultados(articulos);
    }
  }, [articulos]);

  const hacerBusqueda = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      navegar("/buscar/" + busqueda, { replace: true });
    }
  };

  const filtrarResultados = (e) => {
    const query = e.target.value.toLowerCase();
    setBusqueda(query);

    if (query.trim() === "") {
      setResultados(articulos);
      return;
    }

    const coincidencias = articulos.filter((articulo) => {
      const titulo = articulo.titulo.toLowerCase();
      const fecha = new Date(articulo.fecha);

      const mes = fecha.toLocaleString("es-ES", { month: "long" }).toLowerCase();
      const año = fecha.getFullYear().toString();

      return titulo.includes(query) || mes.includes(query) || año.includes(query);
    });

    setResultados(coincidencias);
  };

  const articulosAMostrar = mostrarTodo ? resultados : resultados.slice(0, 5);

  return (
    <aside className="lateral">
      <div className="search">
        <h2 className="title">Buscador</h2>
        <form onSubmit={hacerBusqueda}>
          <label htmlFor="search_field"></label>
          <input
            type="text"
            id="search_field"
            name="search_field"
            value={busqueda}
            onChange={filtrarResultados}
            placeholder="Buscar por título, mes (enero, febrero...) o año (yyyy)"
          />
          <button type="submit" id="search">Buscar</button>
        </form>
      </div>

      <div className="ultimos-articulos">
        <h2>Últimos Artículos</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          articulosAMostrar.length > 0 ? (
            <ul>
              {articulosAMostrar.map((articulo) => (
                <li key={articulo._id} onClick={() => window.scrollTo(0, 0)}>
                  <Link to={`/articulo/${articulo._id}`}>
                    <h3>{articulo.titulo}</h3>
                  </Link>
                  {articulo.fecha && <h4>{formatFecha(articulo.fecha)}</h4>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay artículos que coincidan con la búsqueda.</p>
          )
        )}

        {resultados.length > 5 && !mostrarTodo && (
          <button className="ver-mas" onClick={() => setMostrarTodo(true)}>Ver todo</button>
        )}
        {mostrarTodo && (
          <button className="ver-menos" onClick={() => setMostrarTodo(false)}>Ver menos</button>
        )}
      </div>

      <h2>¿Quiénes somos?</h2>
      <section className="section about">
        <div className="texto-left">
          <div className="foto-about">
            <img className="foto" src="/img/nosotras.jpeg" alt="foto de nosotras" />
          </div>
          <p>
            Somos M. y M. Lectoras empedernidas y amantes de todo lo hogareño que nos transmita calma
            y paz. Por eso coleccionamos tazas, bufandas y adornos navideños. Viajamos para probar
            buenos platos y comprar buenas historias. Atentas a los pequeños detalles que nos hacen
            sonreír, preferimos regalar a que nos regalen. Por lo general, se nos puede encontrar en
            alguna cafetería tomando chocolate caliente o perdidas en librerías con encanto donde no
            existe el concepto tiempo.
          </p>
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
      fecha: PropTypes.string
    })
  )
};

export default Sidebar;
