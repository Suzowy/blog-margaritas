import { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { Peticion } from "../../helpers/Peticion";
import Global from "../../helpers/Global";

const Editar = () => {
  const [resultado, setResultado] = useState("no_enviado");
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [fecha, setFecha] = useState("");
  const [contenido, setContenido] = useState("");
  const [categorias, setCategorias] = useState(["Cápsulas", "Lectura", "Comida", "Lugares", "Reflexiones"]);
  const [categoria, setCategoria] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [mostrarBotonVolver, setMostrarBotonVolver] = useState(false);

  const [articulo, setArticulo] = useState({
    titulo: '',
    autor: '',
    fecha: '',
    contenido: '',
    categoria: ''
  });

  const params = useParams();
  const navigate = useNavigate();

  const conseguirArticulo = useCallback(async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo({
        titulo: datos.articulo.titulo,
        autor: datos.articulo.autor,
        fecha: datos.articulo.fecha || new Date().toISOString().split("T")[0],
        contenido: datos.articulo.contenido || "",
        categoria: datos.articulo.categoria || ""
      });
      setFecha(datos.articulo.fecha || new Date().toISOString().split("T")[0]);
      setContenido(datos.articulo.contenido || "");
      setCategoria(datos.articulo.categoria || "");
    }
  }, [params.id]);

  useEffect(() => {
    conseguirArticulo();
  }, [conseguirArticulo]);

  const editarArticulo = async (e) => {
    e.preventDefault();

    let categoriaFinal = categoria === "nueva" ? nuevaCategoria.trim() : categoria;

    let nuevoArticulo = {
      ...articulo,
      fecha,
      contenido,
      categoria: categoriaFinal
    };

    const { datos, error } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);

    if (error) {
      console.error("Error en la petición:", error);
      setResultado("error");
      return;
    }

    if (datos?.status === "success") {
      setResultado("guardado");

      if (imagenArchivo) {
        const formData = new FormData();
        formData.append("file0", imagenArchivo);

        const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

        if (subida.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }
      }

      // ✅ Restablecer los valores del formulario después de guardar
      setArticulo({
        titulo: '',
        autor: '',
        fecha: new Date().toISOString().split("T")[0],
        contenido: '',
        categoria: ''
      });
      setFecha(new Date().toISOString().split("T")[0]);
      setContenido("");
      setCategoria("");
      setImagenPreview(null);
      setImagenArchivo(null);
      setNuevaCategoria("");

      // ✅ Mostrar el botón "Volver al Listado"
      setMostrarBotonVolver(true);

      // ✅ Llevar al inicio de la página después de guardar
      window.scrollTo(0, 0);
    } else {
      setResultado("error");
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setArticulo((prevArticulo) => ({
      ...prevArticulo,
      [name]: value,
    }));
  };

  const manejarCambioCategoria = (e) => {
    const seleccion = e.target.value;
    setCategoria(seleccion);

    if (seleccion !== "nueva") {
      setNuevaCategoria("");
    }
  };

  const agregarNuevaCategoria = () => {
    if (nuevaCategoria.trim() && !categorias.includes(nuevaCategoria.trim())) {
      setCategorias([...categorias, nuevaCategoria.trim()]);
      setCategoria(nuevaCategoria.trim());
      setNuevaCategoria("");
    }
  };

  return (
    <>
      <h2 className="crear-h2">Editar Artículo</h2>
      <span className="form-span">Los campos con * son obligatorios</span>
      <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>
 {/* ✅ Botón para volver al listado, se muestra solo después de guardar */}
 {mostrarBotonVolver && (
        <button className="volver" onClick={() => navigate("/articulos")}>
          Volver al Listado
        </button>
      )}

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título <span>*</span></label>
          <input type="text" name="titulo" onChange={manejarCambio} value={articulo.titulo} required />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor <span>*</span></label>
          <input type="text" name="autor" onChange={manejarCambio} value={articulo.autor} required />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha <span>*</span></label>
          <input type="date" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        {/* Selector de Categoría */}
        <div className="form-group">
          <label htmlFor="categoria">Categoría <span>*</span></label>
          <select name="categoria" value={categoria} onChange={manejarCambioCategoria} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="nueva">Agregar nueva categoría</option>
          </select>
        </div>

        {/* Input para nueva categoría */}
        {categoria === "nueva" && (
          <div className="form-group">
            <label htmlFor="nuevaCategoria">Nueva Categoría <span>*</span></label>
            <input
              type="text"
              name="nuevaCategoria"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              placeholder="Escribe la nueva categoría"
              required
            />
            <button type="button" className="btn btn-primary" onClick={agregarNuevaCategoria}>
              Agregar
            </button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="contenido">Contenido <span>*</span></label>
          <ReactQuill value={contenido} onChange={setContenido} theme="snow" />
        </div>

        <div className="form-group drop-zone">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImagenArchivo(file);
              const reader = new FileReader();
              reader.onload = (event) => setImagenPreview(event.target.result);
              reader.readAsDataURL(file);
            }
          }} />
          {imagenPreview && <img src={imagenPreview} alt="Vista previa" className="preview-image" />}
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>

     
    </>
  );
};

export default Editar;
