using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;

namespace API.Controllers
{
    [Route("api/personal")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonalController(AppDbContext context)
        {
            _context = context;
        }

        // PUT: api/personal/modificar
        [HttpPut("modificar")]
        public async Task<IActionResult> ModificarPersonal([FromBody] ModificarPersonalRequest request)
        {
            var sql = @"
                CALL up_modificar_personal(
                    @p_cedula, 
                    @p_rol_id, 
                    @p_contrasena, 
                    @p_p_nombre, 
                    @p_s_nombre, 
                    @p_p_apellido, 
                    @p_s_apellido, 
                    @p_f_nacim, 
                    @p_pais, 
                    @p_provincia, 
                    @p_distrito, 
                    @p_domicilio, 
                    @p_fecha_ingreso
                )";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_cedula", request.cedula),
                new NpgsqlParameter("@p_rol_id", request.rol),
                new NpgsqlParameter("@p_contrasena", request.contrasena),
                new NpgsqlParameter("@p_p_nombre", request.pNombre),
                new NpgsqlParameter("@p_s_nombre", request.sNombre),
                new NpgsqlParameter("@p_p_apellido", request.pApellido),
                new NpgsqlParameter("@p_s_apellido", request.sApellido),
                new NpgsqlParameter("@p_f_nacim", request.fecha_nacimiento),
                new NpgsqlParameter("@p_pais", request.pais),
                new NpgsqlParameter("@p_provincia", request.provincia),
                new NpgsqlParameter("@p_distrito", request.distrito),
                new NpgsqlParameter("@p_domicilio", request.domicilio),
                new NpgsqlParameter("@p_fecha_ingreso", request.fecha_ingreso)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Personal médico modificado exitosamente.");
        }

        // DELETE: api/personal/eliminar
        [HttpDelete("eliminar")]
        public async Task<IActionResult> EliminarPersonal([FromBody] EliminarPersonalRequest request)
        {
            var sql = "CALL up_eliminar_personal(@p_cedula)";
            var parameter = new NpgsqlParameter("@p_cedula", request.Cedula);

            await _context.Database.ExecuteSqlRawAsync(sql, parameter);
            return Ok("Personal médico eliminado exitosamente.");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonalMedico>>> GetPersonalMedico()
        {
            return await _context.PersonalMedico.FromSqlRaw("SELECT * FROM fn_obtener_personal()").ToListAsync();
        }
    }
    public class PersonalMedico
    {
        public decimal cedula { get; set; }
        public string rol { get; set; }
        public string pNombre { get; set; }
        public string sNombre { get; set; }
        public string pApellido { get; set; }
        public string sApellido { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public int edad { get; set; }
        public DateTime fecha_ingreso { get; set; }
        public string pais { get; set; }
        public string provincia { get; set; }
        public string distrito { get; set; }
        public string domicilio { get; set; }
    }
    public class ModificarPersonalRequest : Usuario
    {
        public DateTime fecha_ingreso { get; set; }
    }
    public class EliminarPersonalRequest
    {
        public decimal Cedula { get; set; }
    }
}
