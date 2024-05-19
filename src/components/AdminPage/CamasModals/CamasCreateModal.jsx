import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const CamasCreateModal = ({ show, handleClose }) => {
  const [camaData, setCamaData] = useState({
    numeroCama: "",
    equipoMedico: "",
    salon: "",
    UCI: false,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setCamaData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const validateFields = () => {
    if (!camaData.numeroCama || !camaData.equipoMedico || !camaData.salon) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const nuevaCama = {
        numeroCama: camaData.numeroCama,
        equipoMedico: camaData.equipoMedico.split(","),
        salon: camaData.salon,
        UCI: camaData.UCI,
      };
      console.log("Nueva cama:", nuevaCama);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cama</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="numeroCama">
            <Form.Label>Número de Cama</Form.Label>
            <Form.Control
              type="text"
              name="numeroCama"
              required
              value={camaData.numeroCama}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="equipoMedico">
            <Form.Label>Equipo Médico</Form.Label>
            <Form.Control
              type="text"
              name="equipoMedico"
              required
              value={camaData.equipoMedico}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Separar los elementos por comas (,).
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="salon">
            <Form.Label>Salón</Form.Label>
            <Form.Control
              type="text"
              name="salon"
              required
              value={camaData.salon}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="UCI">
            <Form.Check
              type="checkbox"
              name="UCI"
              label="¿Es una cama de UCI?"
              checked={camaData.UCI}
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

export default CamasCreateModal;
