import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const PersonalEditModal = ({ show, handleClose, personalDataToEdit }) => {
  const [personalData, setPersonalData] = useState({
    pNombre: "",
    sNombre: "",
    pApellido: "",
    sApellido: "",
    cedula: "",
    pais: "",
    provincia: "",
    distrito: "",
    domicilio: "",
    fecha_nacimiento: "",
    fecha_ingreso: "",
    rol: "enfermero",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (personalDataToEdit) {
      // Formatear fecha de nacimiento
      const fechaNacimiento = new Date(personalDataToEdit.fecha_nacimiento);
      const fechaNacimientoFormateada = fechaNacimiento
        .toISOString()
        .split("T")[0];

      // Formatear fecha de ingreso
      const fechaIngreso = new Date(personalDataToEdit.fecha_ingreso);
      const fechaIngresoFormateada = fechaIngreso.toISOString().split("T")[0];

      setPersonalData((prevData) => ({
        ...prevData,
        pNombre: personalDataToEdit.pNombre,
        sNombre: personalDataToEdit.sNombre,
        pApellido: personalDataToEdit.pApellido,
        sApellido: personalDataToEdit.sApellido,
        cedula: personalDataToEdit.cedula,
        pais: personalDataToEdit.pais,
        provincia: personalDataToEdit.provincia,
        distrito: personalDataToEdit.distrito,
        domicilio: personalDataToEdit.domicilio,
        fecha_nacimiento: fechaNacimientoFormateada,
        fecha_ingreso: fechaIngresoFormateada,
        rol: personalDataToEdit.rol,
      }));
    }
  }, [personalDataToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (
      !personalData.pNombre ||
      !personalData.pApellido ||
      !personalData.cedula ||
      !personalData.pais ||
      !personalData.provincia ||
      !personalData.distrito ||
      !personalData.domicilio ||
      !personalData.fecha_nacimiento ||
      !personalData.fecha_ingreso ||
      !personalData.rol
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleGuardar = async () => {
    if (validateFields()) {
      try {
        // Asignar el número entero correspondiente al rol seleccionado
        let rolNumero;
        if (personalData.rol === "Doctor") {
          rolNumero = 2;
        } else if (personalData.rol === "Enfermero") {
          rolNumero = 3;
        } else if (personalData.rol === "administrativo") {
          rolNumero = 1;
        }

        // Construir el objeto de datos con el número de rol asignado
        const dataToSend = {
          cedula: parseInt(personalData.cedula, 10),
          rol: rolNumero,
          pNombre: personalData.pNombre,
          sNombre: personalData.sNombre,
          pApellido: personalData.pApellido,
          sApellido: personalData.sApellido,
          fecha_nacimiento: personalData.fecha_nacimiento,
          pais: personalData.pais,
          provincia: personalData.provincia,
          distrito: personalData.distrito,
          domicilio: personalData.domicilio,
          fecha_ingreso: personalData.fecha_ingreso,
        };

        console.log(dataToSend);

        const response = await fetch(
          "https://hospitecapi.azurewebsites.net/api/personal/modificar",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Personal editado:", responseData);
        handleClose();
        window.location.reload();
      } catch (error) {
        console.error("Error al editar el personal:", error);
        setError("Error al editar el personal. Por favor, inténtalo de nuevo.");
        window.location.reload();
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Personal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="pNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="pNombre"
              required
              value={personalData.pNombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="sNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="sNombre"
              value={personalData.sNombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="pApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="pApellido"
              required
              value={personalData.pApellido}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="sApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="sApellido"
              value={personalData.sApellido}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              required
              value={personalData.cedula}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="pais">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              name="pais"
              required
              value={personalData.pais}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="provincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              name="provincia"
              required
              value={personalData.provincia}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="distrito">
            <Form.Label>Distrito</Form.Label>
            <Form.Control
              type="text"
              name="distrito"
              required
              value={personalData.distrito}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="domicilio">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              type="text"
              name="domicilio"
              required
              value={personalData.domicilio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="fecha_nacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fecha_nacimiento"
              required
              value={personalData.fecha_nacimiento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fecha_ingreso">
            <Form.Label>Fecha de Ingreso</Form.Label>
            <Form.Control
              type="date"
              name="fecha_ingreso"
              required
              value={personalData.fecha_ingreso}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="rol">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="rol"
              required
              value={personalData.rol}
              onChange={handleChange}
            >
              <option value="Enfermero">Enfermero</option>
              <option value="administrativo">Administrativo</option>
              <option value="Doctor">Doctor</option>
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

export default PersonalEditModal;
