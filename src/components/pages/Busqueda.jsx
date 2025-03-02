import { useState, useEffect } from "react";
import Global from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import Listado from './Listado';

const Busqueda = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (busqueda.trim() === "") {
      setArticulos([]);
      return;
    }

    setCargando(true);

    const delayDebounce = setTimeout(() => {
      conseguirArticulos(busqueda);
    }, 300); // Se espera 300ms antes de hacer la petición

    return () => clearTimeout(delayDebounce); // Limpia el timeout si el usuario sigue escribiendo
  }, [busqueda]);

  const conseguirArticulos = async (query) => {
    const { datos } = await Peticion(Global.url + "buscar/" + query, "GET");

    if (datos?.status === "success") {
      setArticulos(datos.articulos);
    } else {
      setArticulos([]);
    }
    setCargando(false);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", width: "100%" }}
      />

      {cargando ? (
        <p>Cargando...</p>
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>No hay artículos para mostrar</h1>
      )}
    </>
  );
};

export default Busqueda;
