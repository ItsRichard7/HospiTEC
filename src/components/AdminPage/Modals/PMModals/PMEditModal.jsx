import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const PMEditModal = ({ show, handleClose, pmDataToEdit }) => {
  const [pmData, setPmData] = useState({
    nombreProcedimiento: "",
    diasRecuperacion: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (pmDataToEdit) {
      setPmData(pmDataToEdit);
    }
  }, [pmDataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (!pmData.nombreProcedimiento || !pmData.diasRecuperacion) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const pmEditado = {
        nombreProcedimiento: pmData.nombreProcedimiento,
        diasRecuperacion: parseInt(pmData.diasRecuperacion, 10),
      };
      console.log("Procedimiento Médico editado:", pmEditado);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Procedimiento Médico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombreProcedimiento">
            <Form.Label>Nombre del Procedimiento</Form.Label>
            <Form.Control
              type="text"
              name="nombreProcedimiento"
              required
              value={pmData.nombreProcedimiento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="diasRecuperacion">
            <Form.Label>Días de Recuperación</Form.Label>
            <Form.Control
              type="number"
              name="diasRecuperacion"
              required
              value={pmData.diasRecuperacion}
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

export default PMEditModal;
