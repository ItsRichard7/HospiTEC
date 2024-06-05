import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { GrUserAdmin } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";
import md5 from "md5";

export const LoginPage = () => {
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const hashedPassword = md5(contrasena);

    const data = {
      cedula: parseInt(cedula),
      contrasena: hashedPassword,
    };

    try {
      const response = await fetch(
        "https://hospitecapi.azurewebsites.net/api/verificarInicioSesion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData.resultado === 1) {
        // Obtener la información del usuario
        const usuarioResponse = await fetch(
          `https://hospitecapi.azurewebsites.net/api/obtenerUsuario/${cedula}`
        );
        const usuarioData = await usuarioResponse.json();
        const usuario = usuarioData[0];

        if (usuario) {
          // Redireccionar según el rol del usuario
          if (usuario.rol === 1) {
            navigate("/admin", { state: { usuario } });
          } else if (usuario.rol === 2 || usuario.rol === 3) {
            navigate("/doc", { state: { usuario } });
          } else if (usuario.rol === 4) {
            navigate("/patient", { state: { usuario } });
          }
        } else {
          setError("No se pudo obtener la información del usuario.");
        }
      } else if (responseData.resultado === 2) {
        setError("La cédula no existe en la base");
      } else if (responseData.resultado === 3) {
        setError("La contraseña es incorrecta");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
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
