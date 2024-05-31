import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EMCreateModal = ({ show, handleClose }) => {
  const [emData, setEmData] = useState({
    nombre: "",
    proveedor: "",
    cantidadDisponible: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (!emData.nombre || !emData.proveedor || !emData.cantidadDisponible) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const nuevoEM = {
        nombre: emData.nombre,
        proveedor: emData.proveedor,
        cantidadDisponible: parseInt(emData.cantidadDisponible),
      };
      console.log("Nuevo equipo médico:", nuevoEM);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Equipo Médico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              required
              value={emData.nombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="proveedor">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="proveedor"
              required
              value={emData.proveedor}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="cantidadDisponible">
            <Form.Label>Cantidad Disponible</Form.Label>
            <Form.Control
              type="number"
              name="cantidadDisponible"
              required
              value={emData.cantidadDisponible}
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

export default EMCreateModal;
