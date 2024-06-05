import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import md5 from "md5";

const PersonalCreateModal = ({ show, handleClose }) => {
  const [personalData, setPersonalData] = useState({
    contrasena: "",
    pNombre: "",
    sNombre: "",
    pApellido: "",
    sApellido: "",
    cedula: "",
    telefono: "",
    pais: "",
    provincia: "",
    distrito: "",
    domicilio: "",
    fecha_nacimiento: "",
    fecha_ingreso: "",
    rol: "enfermero",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (
      !personalData.contrasena ||
      !personalData.pNombre ||
      !personalData.sNombre ||
      !personalData.pApellido ||
      !personalData.sApellido ||
      !personalData.cedula ||
      !personalData.pais ||
      !personalData.provincia ||
      !personalData.distrito ||
      !personalData.domicilio ||
      !personalData.fecha_nacimiento
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = async () => {
    if (validateFields()) {
      const nuevoPersonal = {
        cedula: parseInt(personalData.cedula, 10),
        rol: personalData.rol.toLowerCase() === "enfermero" ? 3 : 2, // Asignar 3 si es enfermero, 2 si es doctor
        contrasena: md5(personalData.contrasena), // Aplicar MD5 a la contraseña
        pNombre: personalData.pNombre,
        sNombre: personalData.sNombre,
        pApellido: personalData.pApellido,
        sApellido: personalData.sApellido,
        fecha_nacimiento: new Date(personalData.fecha_nacimiento).toISOString(),
        pais: personalData.pais,
        provincia: personalData.provincia,
        distrito: personalData.distrito,
        domicilio: personalData.domicilio,
      };
      console.log(nuevoPersonal);

      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/insertarUsuario",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoPersonal),
          }
        );

        if (!response.ok) {
          throw new Error("Error al guardar el personal");
        }

        console.log("Nuevo personal guardado:", nuevoPersonal);
        handleClose();
        window.location.reload();
      } catch (error) {
        setError("Error al guardar el personal: " + error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Personal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasena"
              required
              value={personalData.contrasena}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="pNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="pNombre"
              required
              value={personalData.pNombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="sNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="sNombre"
              value={personalData.sNombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="pApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="pApellido"
              required
              value={personalData.pApellido}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="sApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="sApellido"
              value={personalData.sApellido}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              required
              value={personalData.cedula}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="pais">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              name="pais"
              required
              value={personalData.pais}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="provincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              name="provincia"
              required
              value={personalData.provincia}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="distrito">
            <Form.Label>Distrito</Form.Label>
            <Form.Control
              type="text"
              name="distrito"
              required
              value={personalData.distrito}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="domicilio">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              type="text"
              name="domicilio"
              required
              value={personalData.domicilio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="fecha_nacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fecha_nacimiento"
              required
              value={personalData.fecha_nacimiento}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="rol">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="rol"
              value={personalData.rol}
              onChange={handleChange}
            >
              <option value="enfermero">Enfermero</option>
              <option value="doctor">Doctor</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PersonalCreateModal;
