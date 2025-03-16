import { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importa los estilos de Quill
import { useParams, useNavigate } from "react-router-dom";
import { Peticion } from "../../helpers/Peticion";
import Global from "../../helpers/Global";

const Editar = () => {
  const [resultado, setResultado] = useState("no_enviado");
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [fecha, setFecha] = useState("");
  const [contenido, setContenido] = useState("");  // Guardar el contenido con formato
  const [articulo, setArticulo] = useState({
    titulo: '',
    autor: '',
    fecha: '',
    contenido: ''
  });
  const params = useParams();
  const navigate = useNavigate();

  // Función para cargar los datos del artículo
  const conseguirArticulo = useCallback(async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo({
        titulo: datos.articulo.titulo,
        autor: datos.articulo.autor,
        fecha: datos.articulo.fecha || new Date().toISOString().split("T")[0],
        contenido: datos.articulo.contenido || ""
      });
      setFecha(datos.articulo.fecha || new Date().toISOString().split("T")[0]);
      setContenido(datos.articulo.contenido || ""); // Cargar contenido del artículo
    }
  }, [params.id]);

  useEffect(() => {
    conseguirArticulo();
  }, [conseguirArticulo]);

  // Función para actualizar los datos del artículo
  const editarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = {
      ...articulo,
      fecha,
      contenido,  // El contenido con formato se guarda aquí
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
          navigate("/articulos"); // Redirige después de guardar
        } else {
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }
  };

  // Manejo de la imagen
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

  // Manejar el cambio en los campos
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setArticulo((prevArticulo) => ({
      ...prevArticulo,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 className="crear-h2">Editar Artículo</h2>
      <span className="form-span">Los campos con * son obligatorios</span>
      <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título <span>*</span></label>
          <input
            type="text"
            name="titulo"
            onChange={manejarCambio}
            value={articulo.titulo}
            required
            placeholder="Escribe el título de tu artículo."
          />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor <span>*</span></label>
          <input
            type="text"
            name="autor"
            onChange={manejarCambio}
            value={articulo.autor}
            required
            placeholder="Nombre del autor."
          />
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
            onChange={setContenido}  // Aquí se actualiza el contenido con formato
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
                ['image']
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
        <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
        <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>
      </form>
    </>
  );
};

export default Editar;
