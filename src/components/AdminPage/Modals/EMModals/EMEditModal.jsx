import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EMEditModal = ({ show, handleClose, emDataToEdit }) => {
  const [emData, setEmData] = useState({
    placa: "",
    proveedor: "",
    tipo: "",
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
    if (!emData.placa || !emData.proveedor || !emData.tipo) {
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

      const emEditado = {
        placa: emData.placa,
        proveedor: emData.proveedor,
        tipo: tipoMap[emData.tipo],
        numero: 3,
      };

      console.log("Equipo Médico editado:", emEditado);

      const url =
        "https://hospitecapi.azurewebsites.net/api/equiposmedicos/modificar";

      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emEditado),
        });

        if (response.ok) {
          console.log("Equipo médico modificado exitosamente");
          handleClose();
          window.location.reload(); // Recarga la página para reflejar los cambios
        } else {
          setError(
            "Error al modificar el equipo médico: " + response.statusText
          );
        }
      } catch (error) {
        setError(
          "Error de red al modificar el equipo médico: " + error.message
        );
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Equipo Médico</Modal.Title>
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

export default EMEditModal;
