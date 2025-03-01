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
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.trim() === "") {
      setResultados(articulos);
    } else {
      const coincidencias = articulos.filter(articulo =>
        articulo.titulo.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(coincidencias);
    }
  };

  const articulosAMostrar = mostrarTodo ? resultados : resultados.slice(0, 5);

  return (
    <aside className="lateral">
      <div className="search">
        <h2 className="title">Buscador</h2>
        <form onSubmit={hacerBusqueda}>
          <input
            type="text"
            name="search_field"
            value={busqueda}
            onChange={filtrarResultados}
            placeholder="Buscar artículos..."
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
                <li key={articulo._id}>
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
      fecha: PropTypes.string
    })
  )
};

export default Sidebar;
