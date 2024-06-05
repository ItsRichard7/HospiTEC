import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const SalonEditModal = ({ show, handleClose, salonDataToEdit }) => {
  const [salonData, setSalonData] = useState({
    numeroSalon: 0,
    nombreSalon: "",
    capacidadCamas: 0,
    tipo: 0,
    piso: 0,
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

  const handleGuardar = async () => {
    if (validateFields()) {
      const tipoMap = {
        "medicina general": 1,
        "medicina de hombres": 2,
        "medicina de mujeres": 3,
        "medicina de niños": 4,
      };

      const salonEditado = {
        numeroSalon: salonData.numeroSalon,
        nombreSalon: salonData.nombreSalon,
        capacidadCamas: parseInt(salonData.capacidadCamas),
        tipo: tipoMap[salonData.tipo], // Mapear el tipo al valor correspondiente
        piso: parseInt(salonData.piso),
      };
      console.log("Salón editado:", salonEditado);

      const url = "https://hospitecapi.azurewebsites.net/api/salones/modificar";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(salonEditado),
        });

        if (response.ok) {
          console.log("Salón modificado exitosamente");
          handleClose();
          window.location.reload(); // Recarga la página para reflejar los cambios
        } else {
          setError("Error al modificar el salón: " + response.statusText);
        }
      } catch (error) {
        setError("Error de red al modificar el salón: " + error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Salón</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
              as="select"
              name="tipo"
              required
              value={salonData.tipo}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              <option value="medicina general">Medicina General</option>
              <option value="medicina de hombres">Medicina de Hombres</option>
              <option value="medicina de mujeres">Medicina de Mujeres</option>
              <option value="medicina de niños">Medicina de Niños</option>
            </Form.Control>
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
