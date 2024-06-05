import React, { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation, useNavigate } from "react-router-dom";

function Calendar() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cama, usuario } = state || {};
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para obtener las reservaciones de la API
    const fetchReservaciones = async () => {
      try {
        const response = await fetch(
          `https://hospitecapi.azurewebsites.net/api/reservaciones/cama/${cama.numeroCama}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener las reservaciones");
        }
        const data = await response.json();
        // Formatear las reservaciones para FullCalendar
        const eventosFormateados = data.map((reservacion) => ({
          id: reservacion.id,
          title: `Reservación ${reservacion.id}`,
          start: reservacion.fechaIngreso,
          end: reservacion.fechaSalida,
        }));
        setEventos(eventosFormateados);
      } catch (error) {
        setError("No se pudieron cargar las reservaciones");
      }
    };

    fetchReservaciones();
  }, [cama.numeroCama]);

  const handleBack = () => {
    navigate(-1, { state: { usuario, cama } });
  };

  return (
    <div className="calendar-container">
      <div className="see"> Horario del laboratorio {cama.numeroCama}</div>
      <div className="button-container">
        <button className="see" onClick={handleBack}>
          Volver
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={eventos}
        locales={"es"}
        locale={"es"}
      />
    </div>
  );
}

export default Calendar;
