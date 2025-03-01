import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
  const [formulario, setFormulario] = useState(objetoInicial);

  const serializarFormulario = (formulario) => {
    const formData = new FormData(formulario);
    const objetoCompleto = {};

    for (let [name, value] of formData) {
      objetoCompleto[name] = value;
    }

    return objetoCompleto;
  };

  const enviado = (e) => {
    e.preventDefault();

    let curso = serializarFormulario(e.target);
    setFormulario(curso);

    document.querySelector(".codigo").classList.add("enviado");
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormulario(objetoInicial); // Esto restablece el formulario a su estado inicial
  };

  return {
    formulario,
    enviado,
    cambiado,
    resetForm, // Aquí agregamos la función resetForm
  };
};
