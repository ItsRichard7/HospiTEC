import React, { useState } from "react";
import "./DocPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import historialMedData from "../Assets/historialMed.json";
import { BsFillPencilFill } from "react-icons/bs";

import HmModal from "./createHMModal";
import EditHMModal from "./editHMModal";

export const DocPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [patologias, setPatologias] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [historialesMedicos, setHistorialesMedicos] = useState(
    historialMedData || []
  );

  const [cedulaB, setCedulaB] = useState("");

  const [error, setError] = useState("");

  const handleAgregarPaciente = (e) => {
    e.preventDefault();

    const tratamientoFinal = tratamiento.trim() === "" ? null : tratamiento;
    const patologiasFinal = patologias.trim() === "" ? null : patologias;

    const nuevoPaciente = {
      nombre,
      apellido1,
      apellido2,
      cedula,
      telefono,
      pais,
      provincia,
      distrito,
      domicilio,
      fechaNacimiento,
      patologias: patologiasFinal,
      tratamiento: tratamientoFinal,
      rol: "paciente",
      aprobado: false,
    };

    // Guardar el paciente en el localStorage
    localStorage.setItem("nuevoPaciente", JSON.stringify(nuevoPaciente));

    console.log("Nuevo paciente:", nuevoPaciente);
    // Recargar página o manejar el nuevo paciente como sea necesario
  };

  // listas

  const [historialPaciente, setHistorialPaciente] = useState([]);

  const handleBuscarReporte = () => {
    // Filtrar el historial de horas por la cédula ingresada
    const historialFiltrado = historialesMedicos.filter(
      (registro) => registro.cedula === cedulaB
    );
    // Actualizar el estado con el historial de horas y las horas totales
    setHistorialPaciente(historialFiltrado);
  };

  /// editar
  const [showEditHMModal, setShowEditHMModal] = useState(false);
  const [hmDataToEdit, setHmDataToEdit] = useState(null);
  const handleOpenEditHMSModal = (idx) => {
    setHmDataToEdit(historialPaciente[idx]);
    setShowEditHMModal(true);
  };
  const handleCloseEditHMSModal = () => {
    setHmDataToEdit(null);
    setShowEditHMModal(false);
  };

  // Crear

  const [showHmModal, setShowHmModal] = useState(false);
  const handleOpenHmModal = () => setShowHmModal(true);
  const handleCloseHmModal = () => setShowHmModal(false);

  return (
    <Container className="py-4">
      <h1>
        Bienvenido {usuario.rol} {usuario.pNombre}
      </h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Agregar Paciente">
            <div className="wrapper-doc">
              <form onSubmit={handleAgregarPaciente}>
                <div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Nombre"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Primer Apellido"
                      required
                      value={apellido1}
                      onChange={(e) => setApellido1(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Segundo Apellido"
                      required
                      value={apellido2}
                      onChange={(e) => setApellido2(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      placeholder="Cédula"
                      required
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      placeholder="Teléfono"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Pais"
                      required
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Provincia"
                      required
                      value={provincia}
                      onChange={(e) => setProvincia(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Distrito"
                      required
                      value={distrito}
                      onChange={(e) => setDistrito(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Domicilio"
                      required
                      value={domicilio}
                      onChange={(e) => setDomicilio(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      placeholder="Fecha de Nacimiento"
                      required
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Patologías"
                      value={patologias}
                      onChange={(e) => setPatologias(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <textarea
                      id="tratamiento"
                      placeholder="Tratamientos"
                      value={tratamiento}
                      onChange={(e) => setTratamiento(e.target.value)}
                      rows={10} // Ajusta el número de filas aquí para hacer el textarea más grande
                    ></textarea>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit">Añadir paciente</button>
                </div>
              </form>
            </div>
          </Tab>
          <Tab eventKey="tab-2" title="Historial Clinico">
            <div>
              <div className="geeksContainer">
                <input
                  type="text"
                  id="cedInput"
                  placeholder="Ingrese la cedula"
                  className="geeksInput"
                  value={cedulaB}
                  onChange={(e) => setCedulaB(e.target.value)}
                />
                <h1 className="geeksHeading"></h1>
                <button onClick={handleBuscarReporte} className="geeksBtn">
                  Buscar Reporte
                </button>
              </div>
              {historialPaciente.length > 0 ? (
                <div>
                  <h2>Historial Médico</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Procedimiento Realizado</th>
                        <th>Fecha del Procedimiento</th>
                        <th>Tratamiento Prescrito</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialPaciente.map((registro, idx) => (
                        <tr key={idx}>
                          <td>{registro.procedimiento_realizado}</td>
                          <td>{registro.fecha_procedimiento}</td>
                          <td className="expand">
                            {registro.tratamiento_prescrito}
                          </td>
                          <td className="fit">
                            <span className="actions">
                              <BsFillPencilFill
                                className="edit-btn"
                                onClick={() => handleOpenEditHMSModal(idx)}
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No se encontraron registros de horas para el operador.</p>
              )}
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={handleOpenHmModal}>Agregar</Button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Row>

      {hmDataToEdit && (
        <EditHMModal
          show={showEditHMModal}
          handleClose={handleCloseEditHMSModal}
          hmDataToEdit={hmDataToEdit}
        />
      )}

      <HmModal show={showHmModal} handleClose={handleCloseHmModal} />
    </Container>
  );
};
