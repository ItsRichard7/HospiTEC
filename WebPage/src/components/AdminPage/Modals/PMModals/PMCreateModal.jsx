import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const PMCreateModal = ({ show, handleClose }) => {
  const [pmData, setPmData] = useState({
    nombreProcedimiento: "",
    diasRecuperacion: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const nuevoPM = {
        nombreProcedimiento: pmData.nombreProcedimiento,
        diasRecuperacion: parseInt(pmData.diasRecuperacion),
      };

      fetch(
        "https://hospitecapi.azurewebsites.net/api/procedimientos/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoPM),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al guardar el procedimiento médico");
            window.location.reload();
          }

          return response.json();
        })
        .then((data) => {
          console.log("Procedimiento médico guardado:", data);
          setSuccess("Procedimiento médico guardado exitosamente.");
          handleClose();
          window.location.reload();
        })
        .catch((error) => {
          window.location.reload();
          console.error("Error:", error);
          setError(
            "Hubo un error al guardar el procedimiento médico. Por favor, intente nuevamente."
          );
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Procedimiento Médico</Modal.Title>
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
        {success && <Alert variant="success">{success}</Alert>}
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

export default PMCreateModal;
