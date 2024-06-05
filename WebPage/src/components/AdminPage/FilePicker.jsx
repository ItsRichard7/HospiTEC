import React, { useState } from "react";

const FilePicker = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Por favor seleccione un archivo CSV.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError("No se ha seleccionado ningún archivo.");
      return;
    }

    // Aquí puedes agregar el código para manejar el archivo CSV seleccionado
    console.log("Archivo seleccionado:", file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Seleccione un archivo CSV:
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Subir archivo</button>
      </form>
    </div>
  );
};

export default FilePicker;
