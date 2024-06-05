import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CamaSol.css";

export const CamaSol = () => {
  const location = useLocation();
  const { usuario, cama } = location.state || {};
  const Navigate = useNavigate();
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [procedimientos, setProcedimientos] = useState([]);
  const [procedimientosMedicos, setProcedimientosMedicos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para obtener los procedimientos de la API
    const fetchProcedimientos = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/procedimientos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los procedimientos");
        }
        const data = await response.json();
        setProcedimientosMedicos(data);
      } catch (error) {
        setError("No se pudieron cargar los procedimientos");
      }
    };

    fetchProcedimientos();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Calcular la cantidad total de días sumando los días de recuperación de los procedimientos seleccionados
    const totalDiasRecuperacion = procedimientos.reduce((total, proc) => {
      const procedimiento = procedimientosMedicos.find(
        (p) => p.nombreProcedimiento === proc
      );
      return total + procedimiento.diasRecuperacion;
    }, 0);

    // Calcular la fecha final
    const fechaInicio = new Date(fechaIngreso);
    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setDate(fechaInicio.getDate() + totalDiasRecuperacion);

    // Formatear la fecha final como string en formato "yyyy-mm-dd"
    const fechaFinalString = fechaFinal.toISOString().split("T")[0];

    // Crear los datos del formulario
    const datosFormulario = {
      cedulaUsuario: usuario.cedula,
      camaSolicitada: cama.numeroCama,
      fechaIngreso,
      procedimientos,
      totalDiasRecuperacion,
      fechaFinal: fechaFinalString,
    };

    try {
      // Llamado POST para verificar disponibilidad
      const disponibilidadResponse = await fetch(
        "https://hospitecapi.azurewebsites.net/api/reservaciones/disponibilidad",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numCama: cama.numeroCama,
            fechaIngreso,
            fechaSalida: fechaFinalString,
          }),
        }
      );
      if (!disponibilidadResponse.ok) {
        throw new Error(
          "Error al verificar la disponibilidad de la cama, por favor intente de nuevo."
        );
      }
      const disponibilidadData = await disponibilidadResponse.json();
      if (disponibilidadData.disponibilidad !== 1) {
        throw new Error(
          "La cama seleccionada no está disponible en las fechas especificadas."
        );
      }

      // Llamado POST para insertar la reservación
      const insertarResponse = await fetch(
        "https://hospitecapi.azurewebsites.net/api/reservaciones/insertar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cedula: usuario.cedula,
            numeroCama: cama.numeroCama,
            fechaIngreso,
            fechaSalida: fechaFinalString,
          }),
        }
      );
      if (!insertarResponse.ok) {
        throw new Error(
          "Error al insertar la reservación, por favor intente de nuevo."
        );
      }
      const insertarData = await insertarResponse.json();
      const idReservacion = insertarData;

      // Llamado POST para asociar procedimientos a la reservación
      for (const procedimiento of procedimientos) {
        const procedimientoResponse = await fetch(
          "https://hospitecapi.azurewebsites.net/api/reservaciones/procedimiento",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idProcedimiento: procedimientosMedicos.find(
                (p) => p.nombreProcedimiento === procedimiento
              ).id,
              idReservacion,
            }),
          }
        );
        if (!procedimientoResponse.ok) {
          throw new Error(
            "Error al asociar procedimientos a la reservación, por favor intente de nuevo."
          );
        }
      }

      // Si todos los llamados a la API son exitosos, redirigir o mostrar un mensaje de éxito
      console.log("Reservación exitosa!");
      //Navigate("/");
    } catch (error) {
      setError(error.message);
    }
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

  const handleVerHorarios = () => {
    Navigate("/calendar", {
      state: { cama: cama, usuario: usuario },
    });
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
        <button type="submit">Registrar Solicitud</button>
        <button className="see" onClick={handleVerHorarios}>
          Ver Horarios de la cama {cama.numeroCama}
        </button>
      </form>
    </div>
  );
};
