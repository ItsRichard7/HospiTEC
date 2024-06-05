import React, { useState, useEffect } from "react";
import "./PatientPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt } from "react-icons/fa";
import FiveStarRating from "../FiveStarRating/FiveStarRating";

// data
import camasData from "../Assets/camas.json";
import historialesMedicosData from "../Assets/historialMed.json";

export const PatientPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const Navigate = useNavigate();

  // listas
  const [camas, setCamas] = useState(camasData || []);
  const [historialesMedicos, setHistorialesMedicos] = useState(
    historialesMedicosData || []
  );
  const [error, setError] = useState(null);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    const fetchCamas = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/camas"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCamas(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchHM = async () => {
      try {
        const response = await fetch(
          `https://hospitecapi.azurewebsites.net/api/historialmedico/${usuario.cedula}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const historialMedicoData = await response.json();
        setHistorialPaciente(historialMedicoData);
      } catch (error) {
        console.error("Error al buscar el historial médico:", error);
        setError(
          "Error al buscar el historial médico. Por favor, inténtalo de nuevo."
        );
      }
    };

    const fetchSolicitudes = async () => {
      try {
        const response = await fetch(
          `https://hospitecapi.azurewebsites.net/api/reservaciones/usuario/${usuario.cedula}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const historialMedicoData = await response.json();
        setSolicitudes(historialMedicoData);
        console.log(solicitudes);
      } catch (error) {
        console.error("Error al buscar las solicitudes:", error);
        setError(
          "Error al buscar las solicitudes. Por favor, inténtalo de nuevo."
        );
      }
    };

    fetchHM();
    fetchCamas();
    fetchSolicitudes();
  }, []);

  const [historialPaciente, setHistorialPaciente] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  // estados para las evaluaciones
  const [aseoRating, setAseoRating] = useState(0);
  const [tratoRating, setTratoRating] = useState(0);
  const [puntualidadRating, setPuntualidadRating] = useState(0);

  // Filtrar los historiales médicos
  const historialesFiltrados = historialesMedicos.filter(
    (historial) => historial.cedula === usuario.cedula
  );

  const handlePrestarCama = (idx) => {
    console.log("Cama prestada:", camas[idx]);
    console.log(usuario);
    Navigate("/Cama", { state: { usuario: usuario, cama: camas[idx] } });
  };

  const handleEvaluacion = async () => {
    const evaluacionData = {
      id: "", // ID vacío
      cedPaciente: usuario.cedula,
      aseo: aseoRating,
      trato: tratoRating,
      puntualidad: puntualidadRating,
      comentarios: comentario,
    };

    try {
      const response = await fetch(
        "https://hospitecapi.azurewebsites.net/EvalServicio/insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evaluacionData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log("Evaluación enviada:", evaluacionData);
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la evaluación:", error);
    }
  };

  return (
    <Container className="py-4">
      <h1>Bienvenido Paciente {usuario.pNombre}</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Solicitud de Reservación de camas">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Número de cama</th>
                    <th>Salón en el que se encuentra</th>
                    <th>Nombre del Salón</th>
                    <th>UCI</th>
                    <th>Equipo médico con el que cuenta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {camas.map((cama, idx) => (
                    <tr key={idx}>
                      <td>{cama.numeroCama}</td>
                      <td>{cama.salon}</td>
                      <td>{cama.nombreSalon}</td>
                      <td>{cama.uci ? "Sí" : "No"}</td>
                      <td className="expand">
                        {cama.equipoMedico
                          ? typeof cama.equipoMedico === "string"
                            ? cama.equipoMedico
                                .split(",")
                                .map((equipo, i) => (
                                  <div key={i}>{equipo.trim()}</div>
                                ))
                            : cama.equipoMedico
                          : "No tiene"}
                      </td>
                      <td className="fit">
                        <span className="actions">
                          <FaCalendarAlt
                            className="delete-btn"
                            color="blue"
                            onClick={() => handlePrestarCama(idx)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-4" title="Mis Reservaciones">
            <h1>Acá pongo las reservaciones</h1>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Solicitud</th>
                    <th>Número de cama</th>
                    <th>fechaIngreso</th>
                    <th>fechaSalida</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((historial, idx) => (
                    <tr key={idx}>
                      <td>{historial.id}</td>
                      <td>{historial.numeroCama}</td>
                      <td>{historial.fechaIngreso}</td>
                      <td className="expand">{historial.fechaSalida}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-2" title="Ver Historial Clínico">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Procedimiento Realizado</th>
                    <th>Tratamiento Prescrito</th>
                    <th>Fecha del Procedimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {historialPaciente.map((historial, idx) => (
                    <tr key={idx}>
                      <td>{historial.nombre_procedimiento}</td>

                      <td className="expand">
                        {historial.tratamiento_prescrito}
                      </td>
                      <td>{historial.fecha_procedimiento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Evaluación de mi estadía">
            <div className="text-center">
              <h3>Comentario</h3>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu comentario aquí"
                style={{ width: "70%", minHeight: "100px" }} // Ajusta el ancho aquí
              />
              <h3>Aseo del Hospital</h3>
              <FiveStarRating onRatingChange={setAseoRating} />

              <h3>Trato del Personal</h3>
              <FiveStarRating onRatingChange={setTratoRating} />

              <h3>Puntualidad de las Citas</h3>
              <FiveStarRating onRatingChange={setPuntualidadRating} />

              <Button style={{ marginTop: "15px" }} onClick={handleEvaluacion}>
                Enviar Evaluación
              </Button>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
