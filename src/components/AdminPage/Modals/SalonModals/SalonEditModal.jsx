import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const SalonEditModal = ({ show, handleClose, salonDataToEdit }) => {
  const [salonData, setSalonData] = useState({
    numeroSalon: "",
    nombreSalon: "",
    capacidadCamas: "",
    tipo: "",
    piso: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (salonDataToEdit) {
      setSalonData(salonDataToEdit);
    }
  }, [salonDataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (
      !salonData.numeroSalon ||
      !salonData.nombreSalon ||
      !salonData.capacidadCamas ||
      !salonData.tipo ||
      !salonData.piso
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const salonEditado = {
        numeroSalon: salonData.numeroSalon,
        nombreSalon: salonData.nombreSalon,
        capacidadCamas: parseInt(salonData.capacidadCamas),
        tipo: salonData.tipo,
        piso: parseInt(salonData.piso),
      };
      console.log("Salón editado:", salonEditado);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Salón</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="numeroSalon">
            <Form.Label>Número de Salón</Form.Label>
            <Form.Control
              type="text"
              name="numeroSalon"
              required
              value={salonData.numeroSalon}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="nombreSalon">
            <Form.Label>Nombre de Salón</Form.Label>
            <Form.Control
              type="text"
              name="nombreSalon"
              required
              value={salonData.nombreSalon}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="capacidadCamas">
            <Form.Label>Capacidad de Camas</Form.Label>
            <Form.Control
              type="number"
              name="capacidadCamas"
              required
              value={salonData.capacidadCamas}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="tipo"
              required
              value={salonData.tipo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="piso">
            <Form.Label>Piso</Form.Label>
            <Form.Control
              type="number"
              name="piso"
              required
              value={salonData.piso}
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

export default SalonEditModal;
