import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CamaSol.css";

// Lista de procedimientos médicos
const procedimientosMedicos = [
  { nombreProcedimiento: "Apendicectomía", diasRecuperacion: 3 },
  { nombreProcedimiento: "Colecistectomía", diasRecuperacion: 5 },
  { nombreProcedimiento: "Reparación de Hernia", diasRecuperacion: 2 },
  { nombreProcedimiento: "Cesárea", diasRecuperacion: 7 },
];

export const CamaSol = () => {
  const location = useLocation();
  const { usuario, cama } = location.state || {};
  const Navigate = useNavigate();
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [procedimientos, setProcedimientos] = useState([]);
  const [error, setError] = useState("");

  console.log(cama);

  const handleRegister = (e) => {
    e.preventDefault();

    // Calcular la cantidad total de días sumando los días de recuperación de los procedimientos seleccionados
    const totalDiasRecuperacion = procedimientos.reduce((total, proc) => {
      const procedimiento = procedimientosMedicos.find(
        (p) => p.nombreProcedimiento === proc
      );
      return total + procedimiento.diasRecuperacion;
    }, 0);

    // Crear los datos del formulario
    const datosFormulario = {
      cedulaUsuario: usuario.cedula,
      camaSolicitada: cama.numeroCama,
      fechaIngreso,
      procedimientos,
      totalDiasRecuperacion, // Agregamos la cantidad total de días de recuperación al objeto de datos del formulario
    };

    // Guardar los datos en el localStorage
    localStorage.setItem("formData", JSON.stringify(datosFormulario));
    console.log("Datos del formulario:", datosFormulario);
    console.log(localStorage.getItem("formData"));
    //Navigate("/");
  };

  const toggleProcedimiento = (nombreProcedimiento) => {
    if (procedimientos.includes(nombreProcedimiento)) {
      setProcedimientos(
        procedimientos.filter((proc) => proc !== nombreProcedimiento)
      );
    } else {
      setProcedimientos([...procedimientos, nombreProcedimiento]);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>HospiTEC</h1>
        <h2>Ingreso de Procedimientos Médicos</h2>
        <div className="input-box">
          <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
          <input
            type="date"
            required
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
          />
        </div>
        <div className="procedimientos-container">
          <label>Procedimientos Médicos</label>
          <p></p>
          {procedimientosMedicos.map((proc, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                id={proc.nombreProcedimiento}
                value={proc.nombreProcedimiento}
                checked={procedimientos.includes(proc.nombreProcedimiento)}
                onChange={() => toggleProcedimiento(proc.nombreProcedimiento)}
              />
              {proc.nombreProcedimiento}
              <p></p>
            </label>
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};
