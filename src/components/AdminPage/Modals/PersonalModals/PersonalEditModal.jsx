import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const PersonalEditModal = ({ show, handleClose, personalDataToEdit }) => {
  const [personalData, setPersonalData] = useState({
    contrasena: "",
    pNombre: "",
    sNombre: "",
    pApellido: "",
    sApellido: "",
    cedula: "",
    telefono: "",
    direccion: "",
    fecha_nacimiento: "",
    fecha_ingreso: "",
    rol: "enfermero",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (personalDataToEdit) {
      setPersonalData(personalDataToEdit);
    }
  }, [personalDataToEdit]);

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
      !personalData.pApellido ||
      !personalData.cedula ||
      !personalData.telefono ||
      !personalData.direccion ||
      !personalData.fecha_nacimiento ||
      !personalData.fecha_ingreso ||
      !personalData.rol
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const personalEditado = {
        contrasena: personalData.contrasena,
        pNombre: personalData.pNombre,
        sNombre: personalData.sNombre,
        pApellido: personalData.pApellido,
        sApellido: personalData.sApellido,
        cedula: personalData.cedula,
        telefono: personalData.telefono,
        direccion: personalData.direccion,
        fecha_nacimiento: personalData.fecha_nacimiento,
        fecha_ingreso: personalData.fecha_ingreso,
        rol: personalData.rol,
      };
      console.log("Personal editado:", personalEditado);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Personal</Modal.Title>
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
          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              required
              value={personalData.telefono}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              required
              value={personalData.direccion}
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
          <Form.Group controlId="fecha_ingreso">
            <Form.Label>Fecha de Ingreso</Form.Label>
            <Form.Control
              type="date"
              name="fecha_ingreso"
              required
              value={personalData.fecha_ingreso}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="rol">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="rol"
              required
              value={personalData.rol}
              onChange={handleChange}
            >
              <option value="enfermero">Enfermero</option>
              <option value="administrativo">Administrativo</option>
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

export default PersonalEditModal;
