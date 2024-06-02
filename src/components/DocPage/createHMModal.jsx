import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const HmModal = ({ show, handleClose }) => {
  const [hmData, setHmData] = useState({
    cedula: "",
    procedimiento_realizado: "",
    tratamiento_prescrito: "",
    fecha_procedimiento: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (
      !hmData.cedula ||
      !hmData.procedimiento_realizado ||
      !hmData.tratamiento_prescrito ||
      !hmData.fecha_procedimiento
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const nuevoHM = {
        cedula: hmData.cedula,
        procedimiento_realizado: hmData.procedimiento_realizado,
        tratamiento_prescrito: hmData.tratamiento_prescrito,
        fecha_procedimiento: hmData.fecha_procedimiento,
      };
      console.log("Nuevo Historial médico:", nuevoHM);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Historia Médica</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="cedula">
            <Form.Label>Cédula del Paciente</Form.Label>
            <Form.Control
              type="number"
              name="cedula"
              required
              value={hmData.cedula}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="procedimiento_realizado">
            <Form.Label>Procedimiento Realizado</Form.Label>
            <Form.Control
              type="text"
              name="procedimiento_realizado"
              required
              value={hmData.procedimiento_realizado}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tratamiento_prescrito">
            <Form.Label>Tratamiento Prescrito</Form.Label>
            <Form.Control
              type="text"
              name="tratamiento_prescrito"
              required
              value={hmData.tratamiento_prescrito}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fecha_procedimiento">
            <Form.Label>Fecha del Procedimiento</Form.Label>
            <Form.Control
              type="date"
              name="fecha_procedimiento"
              required
              value={hmData.fecha_procedimiento}
              onChange={handleChange}
            />
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

export default HmModal;
