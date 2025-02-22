import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Global from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  // Usamos useCallback para memorizar la función y evitar que se recree en cada renderizado
  const conseguirArticulo = useCallback(async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
    setCargando(false);
  }, [params.id]); // Dependencia de params.id

  useEffect(() => {
    conseguirArticulo();
  }, [conseguirArticulo]); // Solo depende de conseguirArticulo

  // Función para formatear la fecha con día, mes y año en español
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

  return (
    <div className='jumbo'>
      {cargando ? (
        "Cargando..."
      ) : (
        <>
          <div className="articulo-mascara">
            <img
              src={
                articulo.imagen && articulo.imagen !== "default.png"
                  ? articulo.imagen  // Aquí ya es la URL completa de Cloudinary
                  : "https://margaritasamedianoche.files.wordpress.com/2023/05/whatsapp-image-2022-11-27-at-12.32.05-1.jpeg"
              }
              alt={`Imagen de ${articulo.titulo}`}
            />
          </div>

          <h1>{articulo.titulo}</h1>

          {/* Mostrar el autor */}
          {articulo.autor && <h4 className='autor'>{articulo.autor}</h4>}

          {/* Mostrar fecha con día, mes y año */}
          {articulo.fecha && <span className='fecha'>{formatFecha(articulo.fecha)}</span>}

          {/* Mostrar el contenido con formato HTML */}
          <div className='parrafo' dangerouslySetInnerHTML={{ __html: articulo.contenido }} />

          {/* Mostrar el autor */}
          {articulo.autor && <h4 className='autor'>{articulo.autor}</h4>}
        </>
      )}
    </div>
  );
};

export default Articulo;
