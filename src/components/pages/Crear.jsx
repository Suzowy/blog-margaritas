import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

const Crear = () => {
  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [camposContenido, setCamposContenido] = useState([]);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  const guardarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = {
      ...formulario,
      fecha,
    };

    camposContenido.forEach((contenido, index) => {
      nuevoArticulo[`contenido${index + 1}`] = contenido;
    });

    // 1. Enviar artículo al backend
    const { datos, error } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (error) {
      console.error("Error en la petición:", error);
      setResultado("error");
      return;
    }

    if (datos?.status === "success") {
      setResultado("guardado");

      // 2. Subir imagen a Cloudinary solo si se ha seleccionado una imagen
      const fileInput = document.querySelector("#file");
      if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);

        const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

        if (subida.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }
  };

  const agregarCampoContenido = () => {
    if (camposContenido.length < 6) {
      setCamposContenido([...camposContenido, ""]);
    } else {
      alert("Has alcanzado el máximo de 6 párrafos permitidos.");
    }
  };

  const manejarContenido = (index, value) => {
    const nuevosCampos = [...camposContenido];
    nuevosCampos[index] = value;
    setCamposContenido(nuevosCampos);
  };

  const ajustarAltura = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagenPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1>Crear Artículo</h1>
      <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>

      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título <span>*</span></label>
          <input type="text" name="titulo" onChange={cambiado} required placeholder="Escribe el título de tu artículo." />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor <span>*</span></label>
          <input type="text" name="autor" onChange={cambiado} required placeholder="Nombre del autor." />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha <span>*</span></label>
          <input
            type="date"
            name="fecha"
            value={fecha ? fecha.split("T")[0] : ""}  // Tomar solo la parte 'YYYY-MM-DD'
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="contenido">Contenido <span>*</span></label>
          <textarea
            name="contenido"
            onChange={cambiado}
            onInput={ajustarAltura}
            placeholder="Escribe tu artículo..."
            style={{ overflow: "hidden", resize: "none" }}
          />
        </div>

        {camposContenido.map((contenido, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`contenido${index + 1}`}>Contenido {index + 1}</label>
            <textarea
              value={contenido}
              onChange={(e) => manejarContenido(index, e.target.value)}
              onInput={ajustarAltura}
              placeholder={`Párrafo ${index + 1}`}
              style={{ overflow: "hidden", resize: "none" }}
            />
          </div>
        ))}

        <button type="button" onClick={agregarCampoContenido} className="agregar-mas" disabled={camposContenido.length >= 6}>
          {camposContenido.length < 6 ? "Añadir otro párrafo" : "Límite alcanzado"}
        </button>

        <div className="form-group">
          <label htmlFor="file0">Imagen <span>*</span></label>
          <input type="file" name="file0" id="file" onChange={manejarImagen} />
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
