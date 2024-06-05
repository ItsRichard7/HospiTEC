import React, { useState } from "react";
import "./DocPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import md5 from "md5";

import historialMedData from "../Assets/historialMed.json";
import { BsFillPencilFill } from "react-icons/bs";
import { LuEyeOff, LuEye } from "react-icons/lu";

import HmModal from "./createHMModal";
import EditHMModal from "./editHMModal";

export const DocPage = () => {
  const location = useLocation();
  const { usuario } = location.state || {};
  const navigate = useNavigate();

  const [pNombre, setPNombre] = useState("");
  const [sNombre, setSNombre] = useState("");
  const [pApellido, setPApellido] = useState("");
  const [sApellido, setSApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [patologia, setPatologia] = useState("");
  const [tratamiento, setTratamiento] = useState("");

  const [historialesMedicos, setHistorialesMedicos] = useState(
    historialMedData || []
  );

  const [cedulaB, setCedulaB] = useState("");

  const [error, setError] = useState("");

  const handleAgregarPaciente = async (e) => {
    e.preventDefault();

    const fecha_nacimiento = fechaNacimiento;

    const hashedPassword = md5(contrasena);

    const newUser = {
      pNombre,
      sNombre,
      pApellido,
      sApellido,
      cedula: parseInt(cedula),
      contrasena: hashedPassword,
      pais,
      provincia,
      distrito,
      domicilio,
      fecha_nacimiento,
      rol: 4,
    };

    console.log(newUser);

    try {
      const response = await fetch(
        "https://hospitecapi.azurewebsites.net/api/insertarUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.text(); // obtener como texto

      try {
        const jsonResponse = JSON.parse(responseData);
        console.log("Nuevo usuario registrado:", jsonResponse);
        navigate("/");
      } catch (e) {
        console.error("Error al parsear la respuesta:", e);
        window.location.reload();
        setError("Todo salio bien");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError("Error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
  };

  const handleAgregarPatologia = async (e) => {
    e.preventDefault();

    const nuevaPatologia = {
      nombrePatologia: patologia,
      nombreTratamiento: tratamiento,
      cedula: parseInt(cedula),
    };

    try {
      const response = await fetch(
        "https://hospitecapi.azurewebsites.net/api/patologia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaPatologia),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log("Patología agregada con éxito.");

      // Limpia los campos después de enviarlos
      setPatologia("");
      setTratamiento("");
      setCedula("");
    } catch (error) {
      console.error("Error al agregar la patología:", error);
      setError("Error al agregar la patología. Por favor, inténtalo de nuevo.");
    }
  };

  // listas

  const [historialPaciente, setHistorialPaciente] = useState([]);

  const handleBuscarReporte = async () => {
    try {
      const response = await fetch(
        `https://hospitecapi.azurewebsites.net/api/historialmedico/${cedulaB}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const historialMedicoData = await response.json();
      setHistorialPaciente(historialMedicoData);
      console.log(historialMedicoData);
    } catch (error) {
      console.error("Error al buscar el historial médico:", error);
      setError(
        "Error al buscar el historial médico. Por favor, inténtalo de nuevo."
      );
    }
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
                <h1>HospiTEC</h1>
                <h2>Registrarse</h2>
                <div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Primer Nombre"
                      required
                      value={pNombre}
                      onChange={(e) => setPNombre(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Segundo Nombre"
                      required
                      value={sNombre}
                      onChange={(e) => setSNombre(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Primer Apellido"
                      required
                      value={pApellido}
                      onChange={(e) => setPApellido(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Segundo Apellido"
                      required
                      value={sApellido}
                      onChange={(e) => setSApellido(e.target.value)}
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
                      type={mostrarContrasena ? "text" : "password"}
                      placeholder="Contraseña"
                      required
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <span
                      title={
                        mostrarContrasena
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      onClick={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                      {mostrarContrasena ? (
                        <LuEyeOff className="icon" />
                      ) : (
                        <LuEye className="icon" />
                      )}
                    </span>
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="País"
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
                    <input
                      type="date"
                      placeholder="Fecha de Nacimiento"
                      required
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit">Registrarse</button>
                </div>
              </form>
            </div>
          </Tab>
          <Tab eventKey="tab-2" title="Agregar Patologías">
            <div className="wrapper-doc">
              <form onSubmit={handleAgregarPatologia}>
                <h1>Agregar Patología</h1>
                <div>
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
                      type="text"
                      placeholder="Patología"
                      required
                      value={patologia}
                      onChange={(e) => setPatologia(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Tratamiento"
                      required
                      value={tratamiento}
                      onChange={(e) => setTratamiento(e.target.value)}
                    />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit">Agregar Patología</button>
                </div>
              </form>
            </div>
          </Tab>
          <Tab eventKey="tab-3" title="Historial Clinico">
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
                          <td>{registro.nombre_procedimiento}</td>
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
          cedulaB={cedulaB}
        />
      )}

      <HmModal show={showHmModal} handleClose={handleCloseHmModal} />
    </Container>
  );
};
