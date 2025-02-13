import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Global from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
  conseguirArticulo();
}, [params.id]);


  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
    setCargando(false);
  };

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
                articulo.imagen !== "default.png"
                  ? `${Global.url}imagen/${articulo.imagen}`
                  : "https://margaritasamedianoche.files.wordpress.com/2023/05/whatsapp-image-2022-11-27-at-12.32.05-1.jpeg"
              }
              alt={`Imagen de ${articulo.titulo}`}
            />
          </div>

          <h1>{articulo.titulo}</h1>

          {/* Mostrar el autor */}
          {articulo.autor && <h4>{articulo.autor}</h4>}

          {/* Mostrar fecha con día, mes y año */}
          {articulo.fecha && <span>{formatFecha(articulo.fecha)}</span>}

          <div className='parrafo'>{articulo.contenido}</div>
          <div className='parrafo'>{articulo.contenido1}</div>
          <div className='parrafo'>{articulo.contenido2}</div>
          <div className='parrafo'>{articulo.contenido3}</div>
          <div className='parrafo'>{articulo.contenido4}</div>
          <div className='parrafo'>{articulo.contenido5}</div>
          <div className='parrafo'>{articulo.contenido6}</div>

          {/* Mostrar el autor */}
          {articulo.autor && <h4>{articulo.autor}</h4>}
        </>
      )}
    </div>
  );
};

export default Articulo;
