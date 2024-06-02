import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EMEditModal = ({ show, handleClose, emDataToEdit }) => {
  const [emData, setEmData] = useState({
    nombre: "",
    proveedor: "",
    cantidadDisponible: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (emDataToEdit) {
      setEmData(emDataToEdit);
    }
  }, [emDataToEdit]);

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
      const emEditado = {
        nombre: emData.nombre,
        proveedor: emData.proveedor,
        cantidadDisponible: parseInt(emData.cantidadDisponible, 10),
      };
      console.log("Equipo Médico editado:", emEditado);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Equipo Médico</Modal.Title>
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

export default EMEditModal;
