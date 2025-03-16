import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { AuthContext } from "../../context/AuthContext";

const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const [articulos, setArticulos] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const conseguirArticulos = useCallback(async () => {
    const { datos } = await Peticion(Global.url + "articulos", "GET");
    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
  }, []);

  const conseguirArticulo = useCallback(async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");
    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
    setCargando(false);
  }, [params.id]);

  useEffect(() => {
    conseguirArticulo();
    conseguirArticulos();
  }, [conseguirArticulo, conseguirArticulos]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  const siguienteArticulo = () => {
    const indexActual = articulos.findIndex((art) => art._id === params.id);
    if (indexActual !== -1 && indexActual < articulos.length - 1) {
      return articulos[indexActual + 1];
    }
    return null;
  };

  const irAlSiguienteArticulo = () => {
    const siguiente = siguienteArticulo();
    if (siguiente) {
      navigate(`/articulo/${siguiente._id}`);
    }
  };

  const manejarBorrar = async (id) => {
    if (isAuthenticated) {
      const confirmacion = window.confirm("¿Estás seguro de borrar este artículo permanentemente?");
      if (confirmacion) {
        const { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");
        if (datos.status === "success") {
          alert("Artículo eliminado correctamente.");
          navigate("/");
        }
      }
    } else {
      alert("Necesitas iniciar sesión para eliminar un artículo.");
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="jumbo">
      {cargando ? (
        "Cargando..."
      ) : (
        <>
          <div className="articulo-mascara">
            <img
              src={
                articulo.imagen && articulo.imagen !== "default.png"
                  ? articulo.imagen
                  : "https://margaritasamedianoche.files.wordpress.com/2023/05/whatsapp-image-2022-11-27-at-12.32.05-1.jpeg"
              }
              alt={`Imagen de ${articulo.titulo}`}
            />
          </div>
          {isAuthenticated && (
            <>
              <Link to={`/editar/${articulo._id}`} className="edit">Editar</Link>
              <button className="delete" onClick={() => manejarBorrar(articulo._id)}>
                Borrar
              </button>
            </>
          )}
          <h1>{articulo.titulo}</h1>
          {articulo.autor && <h4 className="autor">{articulo.autor}</h4>}
          {articulo.fecha && <span className="fecha">{formatFecha(articulo.fecha)}</span>}
          
         

          <div className="parrafo" dangerouslySetInnerHTML={{ __html: articulo.contenido }} />

         

          {siguienteArticulo() && (
            <button className="ver-mas" onClick={irAlSiguienteArticulo}>
              Leer más
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Articulo;