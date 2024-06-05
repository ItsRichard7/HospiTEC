using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;

namespace API.Controllers
{
    [Route("api/equiposmedicos")]
    [ApiController]
    public class EquiposMedicosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EquiposMedicosController(AppDbContext context)
        {
            _context = context;

        }

        // POST: api/equiposmedicos/agregar
        [HttpPost("agregar")]
        public async Task<IActionResult> AgregarEquipoMedico([FromBody] EquipoMedicoRequest request)
        {
            var sql = "CALL up_insertar_equipo_medico(@p_placa, @p_id_tipo, @p_num_cama, @p_proveedor)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_placa", request.placa),
                new NpgsqlParameter("@p_id_tipo", request.tipo),
                new NpgsqlParameter("@p_num_cama", request.numero),
                new NpgsqlParameter("@p_proveedor", request.proveedor)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Equipo médico agregado exitosamente.");
        }

        // PUT: api/equiposmedicos/modificar
        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarEquipoMedico([FromBody] EquipoMedicoRequest request)
        {
            var sql = "CALL up_modificar_equipo_medico(@p_placa, @p_id_tipo, @p_num_cama, @p_proveedor)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_placa", request.placa),
                new NpgsqlParameter("@p_id_tipo", request.tipo),
                new NpgsqlParameter("@p_num_cama", request.numero),
                new NpgsqlParameter("@p_proveedor", request.proveedor)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Equipo médico modificado exitosamente.");
        }

        // DELETE: api/equiposmedicos/eliminar
        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarEquipoMedico([FromBody] EliminarEquipoMedicoRequest request)
        {
            var sql = "CALL up_eliminar_equipo_medico(@p_placa)";
            var parameter = new NpgsqlParameter("@p_placa", request.placa);

            await _context.Database.ExecuteSqlRawAsync(sql, parameter);
            return Ok("Equipo médico eliminado exitosamente.");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipoMedico>>> GetEquiposMedicos()
        {
            return await _context.EquiposMedicos.FromSqlRaw("SELECT * FROM fn_obtener_equipos_medicos()").ToListAsync();
        }
    }
    public class EquipoMedicoRequest
    {
        public string placa { get; set; }
        public int tipo { get; set; }
        public int numero { get; set; }
        public string proveedor { get; set; }
    }
    public class EliminarEquipoMedicoRequest
    {
        public string placa { get; set; }
    }
    public class EquipoMedico
    {
        public string placa { get; set; }
        public int tipo { get; set; }
        public string nombre { get; set; }
        public int cantidadDefault { get; set; }
        public string proveedor { get; set; }
    }
}
