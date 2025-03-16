export const Peticion = async (url, metodo, datosGuardar = "", archivos = false) => {
  let cargando = true;

  console.log("Iniciando la petición...");
  console.log("URL de la petición:", url);
  console.log("Método de la petición:", metodo);
  console.log("Datos a enviar:", datosGuardar);
  console.log("Envío de archivos:", archivos);

  let opciones = {
    method: "GET"
  };

  if (metodo === "GET" || metodo === "DELETE") {
    opciones = {
      method: metodo,
    };
  }

  if (metodo === "POST" || metodo === "PUT") {
    // eslint-disable-next-line no-unused-vars
    let body = JSON.stringify(datosGuardar);

    if (archivos) {
      opciones = {
        method: metodo,
        body: datosGuardar
      };
    } else {
      opciones = {
        method: metodo,
        body: JSON.stringify(datosGuardar),
        headers: {
          "Content-Type": "application/json"
        }
      };
    }
  }

  // Mostrar la configuración de las opciones antes de la petición
  console.log("Opciones de la petición:", opciones);

  try {
    // Realizar la petición
    const peticion = await fetch(url, opciones);

    // Verificar si hubo algún problema con la respuesta
    if (!peticion.ok) {
      console.error("Error en la respuesta de la API:", peticion.status, peticion.statusText);
    }

    // Leer la respuesta JSON
    const datos = await peticion.json();

    // Mostrar los datos de la respuesta
    console.log("Respuesta de la API:", datos);

    cargando = false;

    return {
      datos,
      cargando
    };
  } catch (error) {
    // Manejar errores de la petición
    console.error("Error en la petición:", error);
    cargando = false;
    return { error, cargando };
  }
}
