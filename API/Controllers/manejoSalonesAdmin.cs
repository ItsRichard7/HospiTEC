using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;

namespace API.Controllers
{
    [Route("api/salones")]
    [ApiController]
    public class SalonesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalonesController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/salones/insertar
        [HttpPost("insertar")]
        public async Task<IActionResult> InsertarSalon([FromBody] InsertarSalonRequest request)
        {
            var sql = "CALL up_insertar_salon(@p_id_tipo, @p_nombre, @p_capacidad, @p_piso)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_id_tipo", request.tipo),
                new NpgsqlParameter("@p_nombre", request.nombreSalon),
                new NpgsqlParameter("@p_capacidad", request.capacidadCamas),
                new NpgsqlParameter("@p_piso", request.piso)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Salón insertado exitosamente.");
        }

        // POST: api/salones/modificar
        [HttpPost("modificar")]
        public async Task<IActionResult> ModificarSalon([FromBody] ModificarSalonRequest request)
        {
            var sql = "CALL up_modificar_salon(@p_numero, @p_id_tipo, @p_nombre, @p_capacidad, @p_piso)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_numero", request.numeroSalon),
                new NpgsqlParameter("@p_id_tipo", request.tipo),
                new NpgsqlParameter("@p_nombre", request.nombreSalon),
                new NpgsqlParameter("@p_capacidad", request.capacidadCamas),
                new NpgsqlParameter("@p_piso", request.piso)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Salón modificado exitosamente.");
        }

        // DELETE: api/salones/eliminar/{numero}
        [HttpDelete("eliminar/{numero}")]
        public async Task<IActionResult> EliminarSalon(int numero)
        {
            var sql = "CALL up_eliminar_salon(@p_numero)";
            var parameter = new NpgsqlParameter("@p_numero", numero);

            await _context.Database.ExecuteSqlRawAsync(sql, parameter);
            return Ok("Salón eliminado exitosamente.");
        }
    }

    public class InsertarSalonRequest
    {
        public int tipo { get; set; }
        public string nombreSalon { get; set; }
        public decimal capacidadCamas { get; set; }
        public decimal piso { get; set; }
    }

    public class ModificarSalonRequest
    {
        public int numeroSalon { get; set; }
        public int tipo { get; set; }
        public string nombreSalon { get; set; }
        public decimal capacidadCamas { get; set; }
        public decimal piso { get; set; }
    }
    public class EliminarSalonRequest
    {
        public int numeroSalon { get; set; }
    }
}
