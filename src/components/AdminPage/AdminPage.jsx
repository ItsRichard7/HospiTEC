import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt } from "react-icons/fa";
import camasData from "../Assets/camas.json";
import equipoMedicoData from "../Assets/equipomed.json";
import medProcData from "../Assets/medProc.json";
import usuariosData from "../Assets/usuarios.json";

//modals
import SalonCreateModal from "./Modals/SalonModals/SalonCreateModal";
import CamasCreateModal from "./Modals/CamasModals/CamasCreateModal";
import EMCreateModal from "./Modals/EMModals/EMCreateModal";
import PMCreateModal from "./Modals/PMModals/PMCreateModal";
import PersonalCreateModal from "./Modals/PersonalModals/PersonalCreateModal";

import SalonEditModal from "./Modals/SalonModals/SalonEditModal";
import CamasEditModal from "./Modals/CamasModals/CamasEditModal";
import EMEditModal from "./Modals/EMModals/EMEditModal";
import PMEditModal from "./Modals/PMModals/PMEditModal";
import PersonalEditModal from "./Modals/PersonalModals/PersonalEditModal";

import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

export const AdminPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const navigate = useNavigate();

  //listas
  const [camas, setCamas] = useState(camasData || []);
  const [salones, setSalones] = useState([]);
  const [equipoMedico, setEquipoMedico] = useState(equipoMedicoData || []);
  const [medProc, setMedProc] = useState(medProcData || []);
  const [usuarios, setUsuarios] = useState(usuariosData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/obtenerSalones"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setSalones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalones();
  }, []);

  const DocyEnfer = usuarios.filter((usuario) => usuario.rol !== "paciente");

  const handlePrestarCama = (idx) => {
    console.log("Cama prestada:", camas[idx]);
  };
  //  const [lab, setLab] = useState(labData || []);

  // handle borrar
  const handleEraseSalon = (idx) => {
    const salonNum = salones[idx].numeroSalon;

    console.log("Salón a borrar " + salonNum);
    //window.location.reload();
  };

  const handleErasePersonal = (idx) => {
    const PersonalCed = DocyEnfer[idx].cedula;

    console.log("Salón a borrar " + PersonalCed);
    //window.location.reload();
  };

  const handleEraseEM = (idx) => {
    const equipoMedicoNom = equipoMedico[idx].nombre;
    console.log("Equipo Medico a borrar " + equipoMedicoNom);
    //window.location.reload();
  };

  const handleEraseCamas = (idx) => {
    const camanum = camas[idx].numeroCama;
    console.log("Cama a borrar " + camanum);
    //window.location.reload();
  };

  const handleErasePM = (idx) => {
    const procedimientoNom = medProc[idx].nombreProcedimiento;
    console.log("Procedimiento médico a borrar " + procedimientoNom);
    //window.location.reload();
  };

  const [evaluaciones, setEvaluaciones] = useState([
    { nombre: "Evaluación 1", valor: 6.2 },
    { nombre: "Evaluación 2", valor: 8.2 },
    { nombre: "Evaluación 3", valor: 3.0 },
  ]);

  // LOGICA DE LOS MODALS

  // MODALS PARA CREAR

  //Tienen la logica para ser mostrado o no

  const [showSalonCreateModal, setShowSalonCreateModal] = useState(false);
  const handleOpenSalonCreateModal = () => setShowSalonCreateModal(true);
  const handleCloseSalonCreateModal = () => setShowSalonCreateModal(false);

  const [showEMCreateModal, setShowEMCreateModal] = useState(false);
  const handleOpenEMCreateModal = () => setShowEMCreateModal(true);
  const handleCloseEMCreateModal = () => setShowEMCreateModal(false);

  const [showCamasCreateModal, setShowCamasCreateModal] = useState(false);
  const handleOpenCamasCreateModal = () => setShowCamasCreateModal(true);
  const handleCloseCamasCreateModal = () => setShowCamasCreateModal(false);

  const [showPMCreateModal, setShowPMCreateModal] = useState(false);
  const handleOpenPMCreateModal = () => setShowPMCreateModal(true);
  const handleClosePMCreateModal = () => setShowPMCreateModal(false);

  const [showPersonalCreateModal, setShowPersonalCreateModal] = useState(false);
  const handleOpenPersonalCreateModal = () => setShowPersonalCreateModal(true);
  const handleClosePersonalCreateModal = () =>
    setShowPersonalCreateModal(false);

  /// editar
  const [showSalonEditModal, setSalonEditModal] = useState(false);
  const [salonDataToEdit, setSalonDataToEdit] = useState(null);
  const handleOpenSalonEditModal = (idx) => {
    setSalonDataToEdit(salones[idx]);
    setSalonEditModal(true);
    console.log(salonDataToEdit);
  };
  const handleCloseSalonEditModal = () => {
    setSalonDataToEdit(null);
    setSalonEditModal(false);
  };

  const [showCamasEditModal, setCamasEditModal] = useState(false);
  const [camasDataToEdit, setCamasDataToEdit] = useState(null);
  const handleOpenCamasEditModal = (idx) => {
    setCamasDataToEdit(camas[idx]);
    setCamasEditModal(true);
  };
  const handleCloseCamasEditModal = () => {
    setCamasDataToEdit(null);
    setCamasEditModal(false);
  };

  const [showEMEditModal, setEMEditModal] = useState(false);
  const [EMDataToEdit, setEMDataToEdit] = useState(null);
  const handleOpenEMEditModal = (idx) => {
    setEMDataToEdit(equipoMedico[idx]);
    setEMEditModal(true);
  };
  const handleCloseEMEditModal = () => {
    setEMDataToEdit(null);
    setEMEditModal(false);
  };

  const [showPMEditModal, setPMEditModal] = useState(false);
  const [PMDataToEdit, setPMDataToEdit] = useState(null);
  const handleOpenPMEditModal = (idx) => {
    setPMDataToEdit(medProc[idx]);
    setPMEditModal(true);
  };
  const handleClosePMEditModal = () => {
    setPMDataToEdit(null);
    setPMEditModal(false);
  };

  const [showPersonalEditModal, setPersonalEditModal] = useState(false);
  const [personalDataToEdit, setPersonalDataToEdit] = useState(null);
  const handleOpenPersonalEditModal = (idx) => {
    setPersonalDataToEdit(DocyEnfer[idx]);
    setPersonalEditModal(true);
  };
  const handleClosePersonalEditModal = () => {
    setPersonalDataToEdit(null);
    setPersonalEditModal(false);
  };

  const handleGenerate = () => {
    console.log("generar excel");
  };

  return (
    <Container className="py-4">
      <h1>Bienvenido Administrador {usuario.pNombre}</h1>
      <Row className="justify-content-center">
        <Tabs
          justify
          variant="pills"
          defaultActiveKey="tab-1"
          className="mb-1 p-0"
        >
          <Tab eventKey="tab-1" title="Gestión de Salones">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Salón en el que se encuentra</th>
                    <th>Nombre del salon en el que se encuentra</th>
                    <th>Capacidad de camas</th>
                    <th>Tipo</th>
                    <th>Piso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {salones.map((salon, idx) => (
                    <tr key={idx}>
                      <td>{salon.numeroSalon}</td>
                      <td>{salon.nombreSalon}</td>
                      <td>{salon.capacidadCamas}</td>
                      <td className="expand">{salon.tipo}</td>
                      <td>{salon.piso}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleEraseSalon(idx)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenSalonEditModal(idx)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={handleOpenSalonCreateModal}>Agregar</Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-2" title="Gestión de Equipo Médico">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad disponible</th>
                    <th>Proveedor</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {equipoMedico.map((EM, idx) => (
                    <tr key={idx}>
                      <td>{EM.nombre}</td>
                      <td>{EM.cantidadDisponible}</td>
                      <td className="expand">{EM.proveedor}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleEraseEM(idx)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenEMEditModal(idx)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={handleOpenEMCreateModal}>Agregar</Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Gestión de Camas">
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
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleEraseCamas(idx)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenCamasEditModal(idx)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={handleOpenCamasCreateModal}>Agregar</Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-4" title="Gestión de Procedimientos Médicos">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre del Procedimiento</th>
                    <th>Días aproximados en recuperarse</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {medProc.map((MP, idx) => (
                    <tr key={idx}>
                      <td>{MP.nombreProcedimiento}</td>
                      <td className="expand">{MP.diasRecuperacion}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleErasePM(idx)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenPMEditModal(idx)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={handleOpenPMCreateModal}>Agregar</Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-5" title="Gestión Personal">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>cedula</th>
                    <th>telefono</th>
                    <th>direccion</th>
                    <th>Fecha de nacimiento</th>
                    <th>Fecha de ingreso</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {DocyEnfer.map((personal, idx) => (
                    <tr key={idx}>
                      <td>{personal.pNombre}</td>
                      <td>{personal.sNombre}</td>
                      <td>{personal.pApellido}</td>
                      <td>{personal.sApellido}</td>
                      <td>{personal.cedula}</td>
                      <td>{personal.telefono}</td>
                      <td>{personal.direccion}</td>
                      <td>{personal.fecha_nacimiento}</td>
                      <td>{personal.fecha_ingreso}</td>
                      <td>{personal.rol}</td>
                      <td className="fit">
                        <span className="actions">
                          <BsFillTrash3Fill
                            className="delete-btn"
                            onClick={() => handleErasePersonal(idx)}
                          />
                          <BsFillPencilFill
                            className="edit-btn"
                            onClick={() => handleOpenPersonalEditModal(idx)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-center mt-3"
                style={{ marginTop: "10px" }}
              >
                <Button onClick={handleOpenPersonalCreateModal}>Agregar</Button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="tab-6" title="Carga de pacientes">
            <div className="wrapper">
              <h1>WHAAAAAAAAAAT </h1>
              <h1>Creo que solo presiono un boton y ya xd</h1>
              <Button onClick={handleGenerate}>Generar</Button>
            </div>
          </Tab>
          <Tab eventKey="tab-7" title="Reporte áreas de mejora">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Evaluación</th>
                    <th className="expand">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluaciones.map((evaluacion, idx) => (
                    <tr key={idx}>
                      <td>{evaluacion.nombre}</td>
                      <td>
                        <div className="progress-bar">
                          <div
                            className="progress"
                            style={{
                              width: `${evaluacion.valor * 10}%`,
                              backgroundColor:
                                evaluacion.valor >= 7.49
                                  ? "green"
                                  : evaluacion.valor >= 4.9
                                  ? "yellow"
                                  : "red",
                            }}
                          ></div>
                        </div>
                        <span>{evaluacion.valor}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </Row>
      <SalonCreateModal
        show={showSalonCreateModal}
        handleClose={handleCloseSalonCreateModal}
      />
      <CamasCreateModal
        show={showCamasCreateModal}
        handleClose={handleCloseCamasCreateModal}
      />
      <EMCreateModal
        show={showEMCreateModal}
        handleClose={handleCloseEMCreateModal}
      />
      <PMCreateModal
        show={showPMCreateModal}
        handleClose={handleClosePMCreateModal}
      />
      <PersonalCreateModal
        show={showPersonalCreateModal}
        handleClose={handleClosePersonalCreateModal}
      />
      {salonDataToEdit && (
        <SalonEditModal
          show={showSalonEditModal}
          handleClose={handleCloseSalonEditModal}
          salonDataToEdit={salonDataToEdit}
        />
      )}
      {camasDataToEdit && (
        <CamasEditModal
          show={showCamasEditModal}
          handleClose={handleCloseCamasEditModal}
          camaDataToEdit={camasDataToEdit}
        />
      )}

      {EMDataToEdit && (
        <EMEditModal
          show={showEMEditModal}
          handleClose={handleCloseEMEditModal}
          emDataToEdit={EMDataToEdit}
        />
      )}

      {PMDataToEdit && (
        <PMEditModal
          show={showPMEditModal}
          handleClose={handleClosePMEditModal}
          pmDataToEdit={PMDataToEdit}
        />
      )}

      {personalDataToEdit && (
        <PersonalEditModal
          show={showPersonalEditModal}
          handleClose={handleClosePersonalEditModal}
          personalDataToEdit={personalDataToEdit}
        />
      )}
    </Container>
  );
};
