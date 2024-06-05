import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import md5 from "md5";

// Iconos
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";

export const RegisterPage = () => {
  const [pNombre, setPNombre] = useState("");
  const [sNombre, setSNombre] = useState("");
  const [pApellido, setPApellido] = useState("");
  const [sApellido, setSApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const fecha_nacimiento = fechaNacimiento;

    const hashedPassword = md5(contrasena);

    const newUser = {
      pNombre,
      sNombre,
      pApellido,
      sApellido,
      cedula: parseInt(cedula),
      contrasena: hashedPassword,
      pais,
      provincia,
      distrito,
      domicilio,
      fecha_nacimiento,
      rol: 4,
    };

    console.log(newUser);

    try {
      const response = await fetch(
        "https://hospitecapi.azurewebsites.net/api/insertarUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.text(); // obtener como texto

      try {
        const jsonResponse = JSON.parse(responseData);
        console.log("Nuevo usuario registrado:", jsonResponse);
        navigate("/");
      } catch (e) {
        console.error("Error al parsear la respuesta:", e);
        navigate("/");
        setError("Todo salio bien");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError("Error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
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
              type={mostrarContrasena ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <span
              title={
                mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
            >
              {mostrarContrasena ? (
                <LuEyeOff className="icon" />
              ) : (
                <LuEye className="icon" />
              )}
            </span>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="País"
              required
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Provincia"
              required
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Distrito"
              required
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Domicilio"
              required
              value={domicilio}
              onChange={(e) => setDomicilio(e.target.value)}
            />
          </div>
          <div className="input-box">
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
