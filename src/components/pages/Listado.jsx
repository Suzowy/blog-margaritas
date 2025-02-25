import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Asegúrate de importar el contexto
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

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

const Listado = ({ articulos, setArticulos }) => {
    const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación

    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");
        if (datos.status === "success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    }

    const manejarBorrar = (id) => {
        if (isAuthenticated) {
            // Confirmación antes de borrar
            const confirmacion = window.confirm("¿Estás seguro de borrar este artículo permanentemente?");
            if (confirmacion) {
                eliminar(id); // Si el usuario confirma, proceder con la eliminación
            }
        } else {
            alert("Necesitas iniciar sesión para eliminar un artículo.");
            // O redirigir al login: <Navigate to="/login" />
        }
    };

    return (
        articulos.map((articulo) => {
            return (
                <article key={articulo._id} className="articulo-item">
                    <div className="mascara">
                        <img
                            src={articulo.imagen && articulo.imagen !== "default.png"
                                ? articulo.imagen
                                : "https://margaritasamedianoche.files.wordpress.com/2023/05/whatsapp-image-2022-11-27-at-12.32.05-1.jpeg"
                            }
                            alt={`Imagen de ${articulo.titulo}`}
                        />
                        {articulo.fecha && <p className="fecha">{formatFecha(articulo.fecha)}</p>}
                    </div>

                    <div className="datos">
                        <h3 className="title">{articulo.titulo}</h3>
                        <p className="description" dangerouslySetInnerHTML={{ __html: articulo.contenido }}></p>
                        <p className="more">
                            <Link to={"/articulo/" + articulo._id}>Leer más...</Link>
                        </p>

                        {/* Mostrar los botones solo si está autenticado */}
                        {isAuthenticated && (
                            <>
                                <Link to={"/editar/" + articulo._id} className="edit">Editar</Link>
                                <button className="delete" onClick={() => manejarBorrar(articulo._id)}>
                                    Borrar
                                </button>
                            </>
                        )}
                    </div>
                </article>
            );
        })
    );
}

export default Listado;

