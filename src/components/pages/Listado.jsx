import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
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
    const { isAuthenticated } = useContext(AuthContext);
    const [paginaActual, setPaginaActual] = useState(1);
    const articulosPorPagina = 10;
    const totalPaginas = Math.ceil(articulos.length / articulosPorPagina);

    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");
        if (datos.status === "success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    };

    const manejarBorrar = (id) => {
        if (isAuthenticated) {
            const confirmacion = window.confirm("¿Estás seguro de borrar este artículo permanentemente?");
            if (confirmacion) {
                eliminar(id);
            }
        } else {
            alert("Necesitas iniciar sesión para eliminar un artículo.");
        }
    };

    const indiceInicial = (paginaActual - 1) * articulosPorPagina;
    const indiceFinal = indiceInicial + articulosPorPagina;
    const articulosPaginados = articulos.slice(indiceInicial, indiceFinal);

    // Lógica para manejar las páginas visibles
    const renderPaginacion = () => {
        const paginas = [];
        const maxVisiblePages = 6;

        // Si hay más de 6 páginas, renderizar las primeras 3, las últimas 3 y la página actual.
        if (totalPaginas > maxVisiblePages) {
            if (paginaActual <= 4) {
                for (let i = 1; i <= 5; i++) {
                    paginas.push(i);
                }
                paginas.push('...');
                paginas.push(totalPaginas);
            } else if (paginaActual >= totalPaginas - 3) {
                paginas.push(1);
                paginas.push('...');
                for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
                    paginas.push(i);
                }
            } else {
                paginas.push(1);
                paginas.push('...');
                for (let i = paginaActual - 2; i <= paginaActual + 2; i++) {
                    paginas.push(i);
                }
                paginas.push('...');
                paginas.push(totalPaginas);
            }
        } else {
            for (let i = 1; i <= totalPaginas; i++) {
                paginas.push(i);
            }
        }

        return paginas.map((pagina, index) => (

            <button
                key={index}
                className={`pagina ${paginaActual === pagina ? 'activa' : ''}`}
                onClick={() => {
                    if (pagina !== '...') {
                        setPaginaActual(pagina);
                    }
                }}
                disabled={pagina === '...'}
            >
                {pagina}
            </button>
        ));
    };

    return (
        <>

            {/* <div className="paginacion">
                <button className="ver-mas"
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                {renderPaginacion()}
                <button className="ver-mas"
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual >= totalPaginas}
                >
                    Siguiente
                </button>
            </div> */}
            <blockquote className='intro'>
                Un lugar donde compartir la belleza de las pequeñas cosas y soñar con la próxima aventura
            </blockquote>
            {articulosPaginados.map((articulo) => (
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
                            <Link to={`/articulo/${articulo._id}`}>Leer más...</Link>
                        </p>

                        {isAuthenticated && (
                            <>
                                <Link to={`/editar/${articulo._id}`} className="edit">Editar</Link>
                                <button className="delete" onClick={() => manejarBorrar(articulo._id)}>
                                    Borrar
                                </button>
                            </>
                        )}
                    </div>
                </article>
            ))}

            <div className="paginacion">
                <button className="ver-mas"
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                {renderPaginacion()}
                <button className="ver-mas"
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual >= totalPaginas}
                >
                    Siguiente
                </button>
            </div>
        </>
    );
};


Listado.propTypes = {
    articulos: PropTypes.array.isRequired,
    setArticulos: PropTypes.func.isRequired
};

export default Listado;
