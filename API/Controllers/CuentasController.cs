using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OfficeOpenXml;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No se ha proporcionado un archivo.");

            var cuentasValidas = new List<Cuenta>();
            var cuentasInvalidas = new List<Cuenta>();
            var cuentasConvertidas = new List<NuevaCuenta>();

            // Establecer el contexto de la licencia
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                using (var package = new ExcelPackage(stream))
                {
                    // Verificar si hay al menos una hoja de trabajo
                    if (package.Workbook.Worksheets.Count == 0)
                        return BadRequest("El archivo Excel no contiene hojas de trabajo.");

                    // Acceder a la primera hoja de trabajo
                    var worksheet = package.Workbook.Worksheets["Worksheet"];
                    var rowCount = worksheet.Dimension.Rows;

                    for (int row = 2; row <= rowCount; row++)
                    {
                        var nombre = worksheet.Cells[row, 1].Text;
                        var cedula = worksheet.Cells[row, 2].Text;
                        var fechaNacimiento = worksheet.Cells[row, 3].Text;
                        var direccion = worksheet.Cells[row, 4].Text;
                        var telefono1 = worksheet.Cells[row, 5].Text;
                        var telefono2 = worksheet.Cells[row, 6].Text;
                        var correo = worksheet.Cells[row, 7].Text;
                        var usuario = worksheet.Cells[row, 8].Text;
                        var pwd = worksheet.Cells[row, 9].Text;

                        if (ValidarNombre(nombre) &&
                            ValidarCedula(cedula) &&
                            ValidarFechaNacimiento(fechaNacimiento) &&
                            ValidarTelefono1(telefono1) &&
                            ValidarTelefono2(telefono2) &&
                            ValidarCorreo(correo) &&
                            ValidarUsuario(usuario, correo))
                        {
                            cuentasValidas.Add(new Cuenta
                            {
                                Nombre = nombre,
                                Cedula = cedula,
                                FechaNacimiento = fechaNacimiento,
                                Direccion = direccion,
                                Telefono1 = telefono1,
                                Telefono2 = telefono2,
                                Correo = correo,
                                Usuario = usuario,
                                PWD = pwd
                            });

                            // Crear nueva cuenta con el formato solicitado
                            var nombres = nombre.Split(", ");
                            var primerNombre = nombres[1].Split(" ")[0];
                            var segundoNombre = nombres[1].Split(" ")[1].Trim('.');
                            var primerApellido = nombres[0];


                            cuentasConvertidas.Add(new NuevaCuenta
                            {
                                Cedula = cedula.Replace(" ", "").Substring(0, 8),
                                Rol = 4,
                                Contrasena = "paciente123",
                                PNombre = primerNombre,
                                SNombre = segundoNombre,
                                PApellido = primerApellido,
                                SApellido = "No Definido", 
                                FechaNacimiento = DateTime.ParseExact(fechaNacimiento, "MMM dd, yyyy", null).ToString("yyyy-MM-dd"),
                                Pais = "No definido",
                                Provincia = "No definido",
                                Distrito = "No definido",
                                Domicilio = "No definido"
                            });
                        }
                        else
                        {
                            // Agregar cuentas no válidas a la lista
                            cuentasInvalidas.Add(new Cuenta
                            {
                                Nombre = nombre,
                                Cedula = cedula,
                                FechaNacimiento = fechaNacimiento,
                                Direccion = direccion,
                                Telefono1 = telefono1,
                                Telefono2 = telefono2,
                                Correo = correo,
                                Usuario = usuario,
                                PWD = pwd
                            });
                        }
                    }
                }
            }

            var jsonResult = JsonConvert.SerializeObject(cuentasConvertidas, Formatting.Indented);
            byte[] excelBytes = GenerateExcelFromCuentas(cuentasInvalidas);

            // Devolver el archivo Excel
            return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "cuentas_invalidas.xlsx");
        
    }
        private byte[] GenerateExcelFromCuentas(List<Cuenta> cuentas)
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Cuentas Inválidas");
                worksheet.Cells.LoadFromCollection(cuentas, true);

                // Autoajustar el ancho de las columnas
                worksheet.Cells.AutoFitColumns();

                return package.GetAsByteArray();
            }
        }


        private bool ValidarNombre(string nombre)
        {
            var regex = new Regex(@"^[A-Z][a-z]+, [A-Z][a-z]+ [A-Z]\.$");
            return regex.IsMatch(nombre);
        }

        private bool ValidarCedula(string cedula)
        {
            var regex = new Regex(@"^\d{6,8} \d{3,4}$");
            return regex.IsMatch(cedula);
        }

        private bool ValidarFechaNacimiento(string fecha)
        {
            var regex = new Regex(@"^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}, \d{4}$");
            return regex.IsMatch(fecha) && DateTime.TryParseExact(fecha, "MMM dd, yyyy", null, System.Globalization.DateTimeStyles.None, out _);
        }

        private bool ValidarTelefono1(string telefono)
        {
            var regex = new Regex(@"^\d{4}-\d{4}$");
            return regex.IsMatch(telefono);
        }

        private bool ValidarTelefono2(string telefono)
        {
            var regex = new Regex(@"^\d{8}$");
            return regex.IsMatch(telefono);
        }

        private bool ValidarCorreo(string correo)
        {
            var regex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[bB][iI][zZ]$");
            return regex.IsMatch(correo);
        }

        private bool ValidarUsuario(string usuario, string correo)
        {
            return usuario == correo;
        }

        public class Cuenta
        {
            public string Nombre { get; set; }
            public string Cedula { get; set; }
            public string FechaNacimiento { get; set; }
            public string Direccion { get; set; }
            public string Telefono1 { get; set; }
            public string Telefono2 { get; set; }
            public string Correo { get; set; }
            public string Usuario { get; set; }
            public string PWD { get; set; }
        }

        public class NuevaCuenta
        {
            public string Cedula { get; set; }
            public int Rol { get; set; }
            public string Contrasena { get; set; }
            public string PNombre { get; set; }
            public string SNombre { get; set; }
            public string PApellido { get; set; }
            public string SApellido { get; set; }
            public string FechaNacimiento { get; set; }
            public string Pais { get; set; }
            public string Provincia { get; set; }
            public string Distrito { get; set; }
            public string Domicilio { get; set; }
        }
    }
}
