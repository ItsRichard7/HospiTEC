using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using API.Class;

namespace API.Controllers
{
    [Route("api/insertarUsuario")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/usuarios
        [HttpPost]
        public async Task<IActionResult> InsertarUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sql = @"
                CALL up_insertar_usuario(
                    @p_cedula,
                    @rol_id,
                    @p_contrasena,
                    @p_p_nombre,
                    @p_s_nombre,
                    @p_p_apellido,
                    @p_s_apellido,
                    @p_f_nacim,
                    @p_pais,
                    @p_provincia,
                    @p_distrito,
                    @p_domicilio
                )";

            var parameters = new[]
            {
                new Npgsql.NpgsqlParameter("@p_cedula", usuario.cedula),
                new Npgsql.NpgsqlParameter("@rol_id", usuario.rol),
                new Npgsql.NpgsqlParameter("@p_contrasena", usuario.contrasena),
                new Npgsql.NpgsqlParameter("@p_p_nombre", usuario.pNombre),
                new Npgsql.NpgsqlParameter("@p_s_nombre", usuario.sNombre),
                new Npgsql.NpgsqlParameter("@p_p_apellido", usuario.pApellido),
                new Npgsql.NpgsqlParameter("@p_s_apellido", usuario.sApellido),
                new Npgsql.NpgsqlParameter("@p_f_nacim", NpgsqlTypes.NpgsqlDbType.Date) { Value = usuario.fecha_nacimiento.Date },
                new Npgsql.NpgsqlParameter("@p_pais", usuario.pais),
                new Npgsql.NpgsqlParameter("@p_provincia", usuario.provincia),
                new Npgsql.NpgsqlParameter("@p_distrito", usuario.distrito),
                new Npgsql.NpgsqlParameter("@p_domicilio", usuario.domicilio)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok();
        }
    }
}
