using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;
using System.Data.Common;

namespace API.Controllers
{
    [Route("api/verificarInicioSesion")]
    [ApiController]
    public class VerificarInicioSesionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VerificarInicioSesionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<VerificarInicioSesionResponse>> VerificarInicioSesion([FromBody] VerificarInicioSesionRequest request)
        {
            var sql = "SELECT fn_verificar_inicio_sesion(@p_cedula, @p_contrasena)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_cedula", request.cedula),
                new NpgsqlParameter("@p_contrasena", request.contrasena)
            };

            // Ejecutar la consulta y obtener el valor de retorno de la función
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.Parameters.AddRange(parameters);

                await _context.Database.OpenConnectionAsync();

                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        var result = reader.GetInt32(0);
                        return new VerificarInicioSesionResponse { resultado = result };
                    }
                }
            }

            return BadRequest("Error al verificar las credenciales.");
        }
    }

    public class VerificarInicioSesionRequest
    {
        public decimal cedula { get; set; }
        public string contrasena { get; set; }
    }

    public class VerificarInicioSesionResponse
    {
        public int resultado { get; set; }
    }
}
