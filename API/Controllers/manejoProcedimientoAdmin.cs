using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;

namespace API.Controllers
{
    [Route("api/procedimientos")]
    [ApiController]
    public class ProcedimientosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProcedimientosController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/procedimientos/agregar
        [HttpPost("agregar")]
        public async Task<IActionResult> AgregarProcedimiento([FromBody] ProcedimientoRequest request)
        {
            var sql = "CALL up_insertar_procedimiento(@p_nombre, @p_dias_recuperacion)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_nombre", request.nombreProcedimiento),
                new NpgsqlParameter("@p_dias_recuperacion", request.diasRecuperacion)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Procedimiento médico agregado exitosamente.");
        }

        // PUT: api/procedimientos/modificar
        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarProcedimiento([FromBody] ModificarProcedimientoRequest request)
        {
            var sql = "CALL up_modificar_procedimiento(@p_id, @p_nombre, @p_dias_recuperacion)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_id", request.id),
                new NpgsqlParameter("@p_nombre", request.nombreProcedimiento),
                new NpgsqlParameter("@p_dias_recuperacion", request.diasRecuperacion)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Procedimiento médico modificado exitosamente.");
        }

        // DELETE: api/procedimientos/eliminar
        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarProcedimiento([FromBody] EliminarProcedimientoRequest request)
        {
            var sql = "CALL up_eliminar_procedimiento(@p_id)";
            var parameter = new NpgsqlParameter("@p_id", request.id);

            await _context.Database.ExecuteSqlRawAsync(sql, parameter);
            return Ok("Procedimiento médico eliminado exitosamente.");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcedimientoMedico>>> GetProcedimientosMedicos()
        {
            return await _context.ProcedimientosMedicos.FromSqlRaw("SELECT * FROM fn_obtener_procedimientos()").ToListAsync();
        }
    }
    public class ProcedimientoMedico
    {
        public int id { get; set; }
        public string nombreProcedimiento { get; set; }
        public int diasRecuperacion { get; set; }
    }
    public class ProcedimientoRequest
    {
        public string nombreProcedimiento { get; set; }
        public int diasRecuperacion { get; set; }
    }
    public class ModificarProcedimientoRequest : ProcedimientoRequest
    {
        public int id { get; set; }
    }
    public class EliminarProcedimientoRequest
    {
        public int id { get; set; }
    }
}
