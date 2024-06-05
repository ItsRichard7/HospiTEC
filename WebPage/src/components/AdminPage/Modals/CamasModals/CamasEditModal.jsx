import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const CamasEditModal = ({ show, handleClose, camaDataToEdit }) => {
  const [camaData, setCamaData] = useState({
    numeroCama: "",
    salon: "",
    UCI: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (camaDataToEdit) {
      setCamaData(camaDataToEdit);
    }
  }, [camaDataToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCamaData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEquipoMedicoChange = (e, index) => {
    const { value } = e.target;
    setCamaData((prevData) => {
      const newEquipoMedico = [...prevData.equipoMedico];
      newEquipoMedico[index] = value;
      return {
        ...prevData,
        equipoMedico: newEquipoMedico,
      };
    });
  };

  const validateFields = () => {
    if (!camaData.numeroCama || !camaData.salon) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = () => {
    if (validateFields()) {
      const camaEditada = {
        ...camaData,
        UCI: Boolean(camaData.UCI),
      };
      console.log("Cama editada:", camaEditada);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cama</Modal.Title>
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
              label="Unidad de Cuidados Intensivos (UCI)"
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

export default CamasEditModal;
