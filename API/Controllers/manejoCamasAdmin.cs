using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;

namespace API.Controllers
{
    [Route("api/camas")]
    [ApiController]
    public class CamasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CamasController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/camas/agregar
        [HttpPost("agregar")]
        public async Task<IActionResult> AgregarCama([FromBody] CamaRequest request)
        {
            var sql = "CALL up_insertar_cama(@p_numero_salon, @p_cuidados_intensivos)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_numero_salon", request.salon),
                new NpgsqlParameter("@p_cuidados_intensivos", request.UCI)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Cama agregada exitosamente.");
        }

        // PUT: api/camas/modificar
        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarCama([FromBody] ModificarCamaRequest request)
        {
            var sql = "CALL up_modificar_cama(@p_numero, @p_numero_salon, @p_cuidados_intensivos)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_numero", request.numeroCama),
                new NpgsqlParameter("@p_numero_salon", request.salon),
                new NpgsqlParameter("@p_cuidados_intensivos", request.UCI)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Cama modificada exitosamente.");
        }

        // DELETE: api/camas/eliminar
        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarCama([FromBody] EliminarCamaRequest request)
        {
            var sql = "CALL up_eliminar_cama(@p_numero)";
            var parameter = new NpgsqlParameter("@p_numero", request.numeroCama);

            await _context.Database.ExecuteSqlRawAsync(sql, parameter);
            return Ok("Cama eliminada exitosamente.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cama>>> GetCamas()
        {
            return await _context.Camas.FromSqlRaw("SELECT * FROM fn_obtener_camas()").ToListAsync();
        }

    }
    public class Cama
    {
        public int numeroCama { get; set; }
        public int salon { get; set; }
        public string nombreSalon { get; set; }
        public bool UCI { get; set; }
        public string? equipoMedico { get; set;} 
    }

    public class CamaRequest
    {
        public int salon { get; set; }
        public bool UCI { get; set; }
    }
    public class ModificarCamaRequest : CamaRequest
    {
        public int numeroCama { get; set; }
    }
    public class EliminarCamaRequest
    {
        public int numeroCama { get; set; }
    }
}
