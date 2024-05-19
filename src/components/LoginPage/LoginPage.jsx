import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

// iconos
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";
import usuariosData from "../Assets/usuarios.json";

export const LoginPage = () => {
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarioEncontrado = usuariosData.find(
      (usuario) =>
        usuario.cedula === cedula && usuario.contrasena === contrasena
    );
    if (usuarioEncontrado) {
      console.log(usuarioEncontrado);
      if (usuarioEncontrado.rol === "administrador") {
        console.log("admin");
        Navigate("/admin", { state: { usuario: usuarioEncontrado } });
      } else if (
        usuarioEncontrado.rol === "doctor" ||
        usuarioEncontrado.rol === "enfermero"
      ) {
        Navigate("/doc", { state: { usuario: usuarioEncontrado } });
      } else if (usuarioEncontrado.rol === "paciente") {
        Navigate("/patient", { state: { usuario: usuarioEncontrado } });
      }
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>HospiTEC</h1>
        <h2>Iniciar Sesión</h2>
        <div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Cédula"
              required
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <span title="Ingrese su cédula">
              <GrUserAdmin className="icon" />
            </span>
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Iniciar Sesión</button>
          <div className="register">
            <span title="Solo pacientes se pueden registrar. Si son doctores y ocupan este proceso, hablar con el administrador al correo: betico@admin.com">
              <Link to="/reg">Registrarse</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
