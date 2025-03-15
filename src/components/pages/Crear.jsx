import { useState } from "react";
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

  const guardarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = {
      ...formulario,
      autor: formulario.autor?.trim() ? formulario.autor : "M&M",
      fecha,
      contenido,
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
          setResultado("guardado");

          resetForm();
          setFecha(new Date().toISOString().split("T")[0]);
          setContenido("");
          setImagenPreview(null);
          setImagenArchivo(null);
        } else {
          setResultado("error");
        }
      } else {
        resetForm();
        setFecha(new Date().toISOString().split("T")[0]);
        setContenido("");
        setImagenPreview(null);
        setImagenArchivo(null);
      }
    } else {
      setResultado("error");
    }
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenArchivo(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagenPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const manejarDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImagenArchivo(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagenPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h2 className="crear-h2">Crear Artículo</h2>
      <span className="form-span">Los campos con * son obligatorios</span>
      <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>

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
          <input
            type="date"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido <span>*</span></label>
          <ReactQuill
            value={contenido}
            onChange={setContenido}
            theme="snow"
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline'],
                ['link'],
                [
                  { color: ['#2f2f2fe9', '#97afa6', '#3e7b6ee2','#721c24', '#b9a782', '#ebe9e5', '#bbb2a1', '#ffffff'] },
                  { background: ['transparent', '#2f2f2fe9', '#97afa6', '#3e7b6ee2','#721c24', '#b9a782', '#ebe9e5', '#bbb2a1', '#ffffff'] }
                ],
                ['blockquote'],
              ],
            }}
          />
        </div>

        <div
          className="form-group drop-zone"
          onDrop={manejarDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" onChange={manejarImagen} />
          <div className="drop-area">
            <span>Arrastra y suelta una imagen aquí o haz clic para seleccionar</span>
          </div>
          {imagenPreview && (
            <div className="preview-container">
              <img src={imagenPreview} alt="Vista previa" className="preview-image" />
            </div>
          )}
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </>
  );
};

export default Crear;
