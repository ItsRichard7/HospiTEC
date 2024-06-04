import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EMCreateModal = ({ show, handleClose }) => {
  const [emData, setEmData] = useState({
    placa: "",
    tipo: "",
    proveedor: "",
    numero: 0,
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
    if (!emData.placa || !emData.tipo || !emData.proveedor || !emData.numero) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = async () => {
    if (validateFields()) {
      const tipoMap = {
        "luces quirúrgicas": 1,
        ultrasonidos: 2,
        esterilizadores: 3,
        desfibriladores: 4,
        monitores: 5,
        "respiradores artificiales": 6,
        electrocardiógrafos: 7,
      };

      const nuevoEM = {
        placa: emData.placa,
        tipo: tipoMap[emData.tipo],
        numero: emData.numero,
        proveedor: emData.proveedor,
      };
      console.log("Nuevo equipo médico:", nuevoEM);

      const url =
        "https://hospitecapi.azurewebsites.net/api/equiposmedicos/agregar";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoEM),
        });

        if (response.ok) {
          console.log("Equipo médico agregado exitosamente");
          handleClose();
          window.location.reload(); // Recarga la página para reflejar los cambios
        } else {
          setError("Error al agregar el equipo médico: " + response.statusText);
        }
      } catch (error) {
        setError("Error de red al agregar el equipo médico: " + error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Equipo Médico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="placa">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              name="placa"
              required
              value={emData.placa}
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
          <Form.Group controlId="numero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="number"
              name="numero"
              required
              value={emData.numero}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              name="tipo"
              required
              value={emData.tipo}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              <option value="luces quirúrgicas">Luces quirúrgicas</option>
              <option value="ultrasonidos">Ultrasonidos</option>
              <option value="esterilizadores">Esterilizadores</option>
              <option value="desfibriladores">Desfibriladores</option>
              <option value="monitores">Monitores</option>
              <option value="respiradores artificiales">
                Respiradores artificiales
              </option>
              <option value="electrocardiógrafos">Electrocardiógrafos</option>
            </Form.Control>
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
