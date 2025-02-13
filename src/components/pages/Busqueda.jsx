import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Global from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import Listado from './Listado';

const Busqueda = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const conseguirArticulos = async () => {
    const { datos } = await Peticion(Global.url + "buscar/" + params.busqueda, "GET");

    if (datos?.status === "success") {
      setArticulos(datos.articulos);
    } else {
      setArticulos([]);
    }
    setCargando(false);
  };

  return (
    <>
      {cargando ? (
        "Cargando..."
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>No hay artículos para mostrar</h1>
      )}
    </>
  );
};

export default Busqueda;
