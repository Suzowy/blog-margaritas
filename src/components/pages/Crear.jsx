import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Crear = () => {
  const { formulario, cambiado, resetForm } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [contenido, setContenido] = useState("");
  const [categorias, setCategorias] = useState(["Cápsulas", "Libros", "Comida", "Lugares", "Reflexiones"]);
  const [categoria, setCategoria] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [mostrarBotonVolver, setMostrarBotonVolver] = useState(false); // Nuevo estado para mostrar el botón

  const navigate = useNavigate();

  const guardarArticulo = async (e) => {
    e.preventDefault();

    let categoriaFinal = categoria === "nueva" ? nuevaCategoria.trim() : categoria;

    if (!categoriaFinal) {
      setResultado("error");
      return;
    }

    let nuevoArticulo = {
      ...formulario,
      autor: formulario.autor?.trim() ? formulario.autor : "M&M",
      fecha,
      contenido,
      categoria: categoriaFinal,
    };

    const { datos, error } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

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
          limpiarFormulario();
        } else {
          setResultado("error");
        }
      } else {
        limpiarFormulario();
      }
    } else {
      setResultado("error");
    }
  };

  // ✅ Función para limpiar el formulario y desplazar la página arriba
  const limpiarFormulario = () => {
    resetForm();
    setFecha(new Date().toISOString().split("T")[0]);
    setContenido("");
    setImagenPreview(null);
    setImagenArchivo(null);
    setCategoria("");
    setNuevaCategoria("");

    setMostrarBotonVolver(true); // ✅ Mostrar el botón "Volver al Listado"
    window.scrollTo(0, 0); // ✅ Llevar la página al inicio
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
      <h2 className="crear-h2">Crear Artículo</h2>
      <span className="form-span">Los campos con * son obligatorios</span>
      <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>

 {/* ✅ Botón para volver al listado, se muestra solo después de guardar */}
 {mostrarBotonVolver && (
        <button className="volver" onClick={() => navigate("/articulos")}>
          Volver al Listado
        </button>
      )}

      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título <span>*</span></label>
          <input type="text" name="titulo" onChange={cambiado} value={formulario.titulo || ""} required placeholder="Escribe el título de tu artículo." />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor</label>
          <input type="text" name="autor" onChange={cambiado} value={formulario.autor || ""} placeholder="Nombre del autor (si no escribes nada por defecto será M&M.)" />
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

        {/* Input para nueva categoría + botón para agregarla */}
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
          <ReactQuill
            value={contenido}
            onChange={setContenido}
            theme="snow"
            modules={{
              toolbar: [['bold', 'italic', 'underline'], ['link'], ['blockquote'], ['image']],
            }}
          />
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
          <div className="drop-area">
            <span>Arrastra y suelta una imagen aquí o haz clic para seleccionar</span>
          </div>
          {imagenPreview && <img src={imagenPreview} alt="Vista previa" className="preview-image" />}
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>

     
    </>
  );
};

export default Crear;
