using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using API.Class;

namespace API.Controllers
{
    [Route("api/[controller]")]
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
                new Npgsql.NpgsqlParameter("@p_cedula", usuario.Cedula),
                new Npgsql.NpgsqlParameter("@p_contrasena", usuario.Contrasena),
                new Npgsql.NpgsqlParameter("@p_p_nombre", usuario.PNombre),
                new Npgsql.NpgsqlParameter("@p_s_nombre", usuario.SNombre),
                new Npgsql.NpgsqlParameter("@p_p_apellido", usuario.PApellido),
                new Npgsql.NpgsqlParameter("@p_s_apellido", usuario.SApellido),
                new Npgsql.NpgsqlParameter("@p_f_nacim", NpgsqlTypes.NpgsqlDbType.Date) { Value = usuario.FNacim.Date },
                new Npgsql.NpgsqlParameter("@p_pais", usuario.Pais),
                new Npgsql.NpgsqlParameter("@p_provincia", usuario.Provincia),
                new Npgsql.NpgsqlParameter("@p_distrito", usuario.Distrito),
                new Npgsql.NpgsqlParameter("@p_domicilio", usuario.Domicilio)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

            return Ok();
        }
    }
}
