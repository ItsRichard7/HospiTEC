import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const CamasCreateModal = ({ show, handleClose }) => {
  const [camaData, setCamaData] = useState({
    salon: "",
    UCI: false,
  });
  const [salones, setSalones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/obtenerSalones"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSalones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalones();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setCamaData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const validateFields = () => {
    if (!camaData.salon) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = async () => {
    if (validateFields()) {
      const nuevaCama = {
        salon: camaData.salon,
        uci: camaData.UCI,
      };
      console.log("Nueva cama:", nuevaCama);

      const url = "https://hospitecapi.azurewebsites.net/api/camas/agregar";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaCama),
        });

        if (response.ok) {
          console.log("Cama agregada exitosamente");
          handleClose();
          window.location.reload(); // Recarga la página para reflejar los cambios
        } else {
          setError("Error al agregar la cama: " + response.statusText);
        }
      } catch (error) {
        setError("Error de red al agregar la cama: " + error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cama</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="salon">
            <Form.Label>Salón</Form.Label>
            <Form.Control
              as="select"
              name="salon"
              required
              value={camaData.salon}
              onChange={handleChange}
            >
              <option value="">Seleccione un salón</option>
              {loading ? (
                <option disabled>Cargando...</option>
              ) : error ? (
                <option disabled>Error al cargar los salones</option>
              ) : (
                salones.map((salon) => (
                  <option key={salon.numeroSalon} value={salon.numeroSalon}>
                    {salon.nombreSalon}
                  </option>
                ))
              )}
            </Form.Control>
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
