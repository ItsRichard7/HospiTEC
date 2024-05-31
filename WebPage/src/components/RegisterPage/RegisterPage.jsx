import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import md5 from "md5";

// Iconos
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";

// Datos necesarios
import usuariosData from "../Assets/usuarios.json";

export const RegisterPage = () => {
  const [pNombre, setPNombre] = useState("");
  const [sNombre, setSNombre] = useState("");
  const [pApellido, setPApellido] = useState("");
  const [sApellido, setSApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const Navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Crear el nuevo usuario
    const newUser = {
      pNombre,
      sNombre,
      pApellido,
      sApellido,
      cedula,
      telefono,
      direccion,
      fechaNacimiento,
      rol: "paciente",
      aprobado: false,
    };

    // Guardar el usuario en el localStorage
    localStorage.setItem("userData", JSON.stringify(newUser));
    console.log("Nuevo usuario:", newUser);
    console.log(localStorage.getItem("userData"));
    Navigate("/");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>HospiTEC</h1>
        <h2>Registrarse</h2>
        <div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Primer Nombre"
              required
              value={pNombre}
              onChange={(e) => setPNombre(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Segundo Nombre"
              required
              value={sNombre}
              onChange={(e) => setSNombre(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Primer Apellido"
              required
              value={pApellido}
              onChange={(e) => setPApellido(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Segundo Apellido"
              required
              value={sApellido}
              onChange={(e) => setSApellido(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              placeholder="Cédula"
              required
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              placeholder="Teléfono"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Dirección"
              required
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              required
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};
