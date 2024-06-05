import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const HmModal = ({ show, handleClose }) => {
  const [hmData, setHmData] = useState({
    cedula: "",
    procedimiento_realizado: "",
    tratamiento_prescrito: "",
    fecha_procedimiento: "",
  });

  const [procedimientos, setProcedimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcedimientos = async () => {
      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/procedimientos"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setProcedimientos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedimientos();
  }, []);

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

  const handleGuardar = async () => {
    if (validateFields()) {
      const nuevoHM = {
        cedula: hmData.cedula,
        procedimiento_realizado: hmData.procedimiento_realizado,
        tratamiento_prescrito: hmData.tratamiento_prescrito,
        fecha_procedimiento: hmData.fecha_procedimiento,
      };

      try {
        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/historialmedico",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoHM),
          }
        );

        if (response.ok) {
          console.log("Historial Médico agregado exitosamente");
          handleClose();
          window.location.reload(); // Recarga la página para reflejar los cambios
        } else {
          setError(
            "Error al agregar el historial médico: " + response.statusText
          );
        }
      } catch (error) {
        setError(
          "Error de red al agregar el historial médico: " + error.message
        );
      }
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
              as="select"
              name="procedimiento_realizado"
              required
              value={hmData.procedimiento_realizado}
              onChange={handleChange}
            >
              <option value="">Seleccione un procedimiento</option>
              {loading ? (
                <option disabled>Cargando...</option>
              ) : error ? (
                <option disabled>Error al cargar los procedimientos</option>
              ) : (
                procedimientos.map((procedimiento) => (
                  <option key={procedimiento.id} value={procedimiento.id}>
                    {procedimiento.nombreProcedimiento}
                  </option>
                ))
              )}
            </Form.Control>
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
