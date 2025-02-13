/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useParams } from "react-router-dom";
import Global from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [cargando, setCargando] = useState(true);
  const [articulo, setArticulo] = useState({});
  const [fecha, setFecha] = useState("");
  const [camposContenido, setCamposContenido] = useState([]);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
      setFecha(datos.articulo.fecha || new Date().toISOString().split("T")[0]);

      // Cargar campos dinámicos si existen
      const nuevosCampos = [];
      for (let i = 1; i <= 6; i++) {
        if (datos.articulo[`contenido${i}`]) {
          nuevosCampos.push(datos.articulo[`contenido${i}`]);
        }
      }
      setCamposContenido(nuevosCampos);
    }

    setCargando(false);
  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = {
      ...formulario,
      fecha,
    };

    // Agregar los párrafos dinámicos
    camposContenido.forEach((contenido, index) => {
      nuevoArticulo[`contenido${index + 1}`] = contenido;
    });

    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);

    if (datos.status === "success") {
      setResultado("guardado");

      // Subir imagen
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

  const manejarContenido = (index, value) => {
    const nuevosCampos = [...camposContenido];
    nuevosCampos[index] = value;
    setCamposContenido(nuevosCampos);
  };

  const agregarCampoContenido = () => {
    if (camposContenido.length < 6) {
      setCamposContenido([...camposContenido, ""]);
    } else {
      alert("Has alcanzado el máximo de 6 párrafos permitidos.");
    }
  };

  const ajustarAltura = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="jumbo">
      <h1>Editar Artículo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>{resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}</strong>
      <strong>{resultado === "error" ? "Los datos proporcionados son incorrectos!!" : ""}</strong>

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} required />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor *</label>
          <input type="text" name="autor" onChange={cambiado} defaultValue={articulo.autor} required />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha *</label>
          <input type="date" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido *</label>
          <textarea
            name="contenido"
            onChange={cambiado}
            onInput={ajustarAltura}
            defaultValue={articulo.contenido}
            style={{ overflow: "hidden", resize: "none" }}
          />
        </div>

        {/* Campos dinámicos de contenido */}
        {camposContenido.map((contenido, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`contenido${index + 1}`}>Contenido {index + 1}</label>
            <textarea
              value={contenido}
              onChange={(e) => manejarContenido(index, e.target.value)}
              onInput={ajustarAltura}
              name={`contenido${index + 1}`}
              placeholder={`Agrega el contenido del párrafo ${index + 1}`}
              style={{ overflow: "hidden", resize: "none" }}
            />
          </div>
        ))}

        <button type="button" onClick={agregarCampoContenido} className="agregar-mas" disabled={camposContenido.length >= 6}>
          {camposContenido.length < 6 ? "Añadir otro párrafo" : "Límite alcanzado"}
        </button>

        <div className="form-group">
          <label htmlFor="file0">Imagen *</label>
          <div className="mascara">
            {articulo.imagen !== "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen} alt={`Imagen de ${articulo.titulo}`} />
            )}

            {articulo.imagen === "default.png" && (
              <img
                src="https://margaritasamedianoche.files.wordpress.com/2023/05/whatsapp-image-2022-11-27-at-12.32.05-1.jpeg"
                alt={`Imagen de ${articulo.titulo}`}
              />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Editar;
