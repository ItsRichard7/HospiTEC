import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt } from "react-icons/fa";
import camasData from "../Assets/camas.json";
import equipoMedicoData from "../Assets/equipomed.json";
import medProcData from "../Assets/medProc.json";
import usuariosData from "../Assets/usuarios.json";
import FilePicker from "./FilePicker";

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

  /*   const reproducirSonido = () => {
    const audio = new Audio('ruta/al/sonido.mp3');
    audio.play();
  };

  return <button onClick={reproducirSonido}>Reproducir Sonido</button>; */

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
        setSalones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

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
    const fetchEquipoMedico = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/equiposmedicos"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEquipoMedico(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchMedProc = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/procedimientos"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMedProc(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/personal"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsuarios();
    fetchMedProc();
    fetchEquipoMedico();
    fetchCamas();
    fetchSalones();
  }, []);

  const DocyEnfer = usuarios.filter((usuario) => usuario.rol !== "paciente");

  const handlePrestarCama = (idx) => {
    console.log("Cama prestada:", camas[idx]);
  };
  //  const [lab, setLab] = useState(labData || []);

  // handle borrar
  const handleEraseSalon = async (idx) => {
    const salonNum = salones[idx].numeroSalon;
    console.log("Salón a borrar " + salonNum);

    // Incluye el número del salón en la URL
    const url = `https://hospitecapi.azurewebsites.net/api/salones/eliminar/${salonNum}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Salón borrado exitosamente");

        window.location.reload();
      } else {
        console.error("Error al borrar el salón: " + response.statusText);
      }
    } catch (error) {
      console.error("Error de red al borrar el salón: " + error);
    }
  };

  const handleErasePersonal = async (idx) => {
    const PersonalCed = DocyEnfer[idx].cedula;
    console.log("Personal a borrar " + PersonalCed);

    const url = "https://hospitecapi.azurewebsites.net/api/personal/eliminar";
    const data = { cedula: PersonalCed };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Personal borrado exitosamente");

        window.location.reload();
      } else {
        console.error("Error al borrar el personal: " + response.statusText);
      }
    } catch (error) {
      console.error("Error de red al borrar el personal: " + error);
    }
  };

  const handleEraseEM = async (idx) => {
    const equipoMedicoNom = equipoMedico[idx].placa;
    console.log("Equipo Medico a borrar " + equipoMedicoNom);

    const url =
      "https://hospitecapi.azurewebsites.net/api/equiposmedicos/eliminar";
    const data = { placa: equipoMedicoNom };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Equipo Médico borrado exitosamente");

        window.location.reload();
      } else {
        console.error(
          "Error al borrar el equipo médico: " + response.statusText
        );
      }
    } catch (error) {
      console.error("Error de red al borrar el equipo médico: " + error);
    }
  };

  const handleEraseCamas = async (idx) => {
    const camanum = camas[idx].numeroCama;
    console.log("Cama a borrar " + camanum);

    const url = "https://hospitecapi.azurewebsites.net/api/camas/eliminar";
    const data = { numeroCama: camanum };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Cama borrada exitosamente");

        window.location.reload();
      } else {
        console.error("Error al borrar la cama: " + response.statusText);
      }
    } catch (error) {
      console.error("Error de red al borrar la cama: " + error);
    }
  };

  const handleErasePM = async (idx) => {
    const procedimientoID = medProc[idx].id;
    console.log("Procedimiento médico a borrar " + procedimientoID);

    const url =
      "https://hospitecapi.azurewebsites.net/api/procedimientos/eliminar";
    const data = { id: procedimientoID };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Procedimiento médico borrado exitosamente");

        window.location.reload();
      } else {
        console.error(
          "Error al borrar el procedimiento médico: " + response.statusText
        );
      }
    } catch (error) {
      console.error("Error de red al borrar el procedimiento médico: " + error);
    }
  };

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
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (file) => {
    console.log("Archivo seleccionado:", file.name);
    setSelectedFile(file.name);
  };

  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    axios
      .get("https://hospitecapi.azurewebsites.net/EvalServicio/all")
      .then((response) => {
        const data = response.data;
        console.log(data);
        const formattedData = data.map((item) => ({
          nombre: `Evaluación del paciente: ${item.cedPaciente}`,
          aseo: item.aseo,
          trato: item.trato,
          puntualidad: item.puntualidad,
          comentarios: item.comentarios,
        }));
        setEvaluaciones(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

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
                    <th>ID</th>
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
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Cantidad disponible</th>
                    <th>Proveedor</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {equipoMedico.map((EM, idx) => (
                    <tr key={idx}>
                      <td>{EM.placa}</td>
                      <td>{EM.nombre}</td>
                      <td>{EM.cantidadDefault}</td>
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
                    <th>Pais</th>
                    <th>Provincia</th>
                    <th>Distrito</th>
                    <th>Domicilio</th>
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
                      <td>{personal.pais}</td>
                      <td>{personal.provincia}</td>
                      <td>{personal.distrito}</td>
                      <td>{personal.domicilio}</td>
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
              <FilePicker onFileSelect={handleFileSelect} />
              <Button onClick={handleGenerate}>Generar</Button>
            </div>
          </Tab>
          <Tab eventKey="tab-7" title="Reporte áreas de mejora">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th class>Evaluación</th>
                    <th>Aseo</th>
                    <th>Trato</th>
                    <th>Puntualidad</th>
                    <th>Promedio</th>
                    <th>Comentario</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluaciones.map((evaluacion, idx) => {
                    // Ajustar evaluaciones de 0 a 0.1
                    const aseo = evaluacion.aseo === 0 ? 0.1 : evaluacion.aseo;
                    const trato =
                      evaluacion.trato === 0 ? 0.1 : evaluacion.trato;
                    const puntualidad =
                      evaluacion.puntualidad === 0
                        ? 0.1
                        : evaluacion.puntualidad;

                    const promedio = (aseo + trato + puntualidad) / 3;

                    const promedioColor =
                      promedio >= 3
                        ? "green"
                        : promedio >= 2
                        ? "yellow"
                        : "red";

                    return (
                      <tr key={idx}>
                        <td>{evaluacion.nombre}</td>
                        <td className="evaluacion-column">
                          <div className="progress-bar">
                            <div
                              className="progress bg-gray"
                              style={{
                                width: `${(aseo / 5) * 100}%`,
                                backgroundColor:
                                  aseo >= 3
                                    ? "green"
                                    : aseo >= 2
                                    ? "yellow"
                                    : "red",
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="evaluacion-column">
                          <div className="progress-bar">
                            <div
                              className="progress bg-gray"
                              style={{
                                width: `${(trato / 5) * 100}%`,
                                backgroundColor:
                                  trato >= 3
                                    ? "green"
                                    : trato >= 2
                                    ? "yellow"
                                    : "red",
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="evaluacion-column">
                          <div className="progress-bar">
                            <div
                              className="progress bg-gray"
                              style={{
                                width: `${(puntualidad / 5) * 100}%`,
                                backgroundColor:
                                  puntualidad >= 3
                                    ? "green"
                                    : puntualidad >= 2
                                    ? "yellow"
                                    : "red",
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="expand">
                          <div className="progress-bar">
                            <div
                              className="progress bg-gray"
                              style={{
                                width: `${(promedio / 5) * 100}%`,
                                backgroundColor: promedioColor,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td>{evaluacion.comentarios}</td>
                      </tr>
                    );
                  })}
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
