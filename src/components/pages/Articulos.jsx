import { useState, useEffect } from 'react';
import Global from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import Listado from './Listado';

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const { datos } = await Peticion(Global.url + "articulos", "GET");
    if (datos.status === "success") {
      setArticulos(datos.articulos); // Obtener todos los artículos
    }
    setCargando(false);
  };

  return (
    <>
      {cargando ? "Cargando..." :
        articulos.length >= 1 ? (
          <Listado articulos={articulos} setArticulos={setArticulos} />
        ) : (
          <h1>No hay artículos para mostrar</h1>
        )
      }
    </>
  );
}

export default Articulos;
