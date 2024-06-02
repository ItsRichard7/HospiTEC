import React, { useState } from "react";
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

  const handleEvaluacion = () => {
    const evaluacionData = {
      cedula: usuario.cedula,
      aseo: aseoRating,
      trato: tratoRating,
      puntualidad: puntualidadRating,
    };
    console.log("Evaluación enviada:", evaluacionData);
    // Aquí puedes enviar el JSON evaluacionData a un servidor o guardarlo donde necesites
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
                      <td>{cama.UCI ? "Sí" : "No"}</td>
                      <td className="expand">
                        {cama.equipoMedico.map((equipo, i) => (
                          <div key={i}>{equipo}</div>
                        ))}
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
                  {historialesFiltrados.map((historial, idx) => (
                    <tr key={idx}>
                      <td>{historial.procedimiento_realizado}</td>

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
