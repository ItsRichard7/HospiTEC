using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Threading.Tasks;
using Npgsql;

namespace API.Controllers
{
    [Route("api/modificarContrasena")]
    [ApiController]
    public class contrasenaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public contrasenaController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/usuarios/modificarContrasena
        [HttpPost]
        public async Task<IActionResult> ModificarContrasena([FromBody] ModificarContrasenaRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sql = "CALL up_modificar_contrasena(@p_cedula, @p_contrasena)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_cedula", request.Cedula),
                new NpgsqlParameter("@p_contrasena", request.Contrasena)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Contraseña modificada exitosamente.");
        }
    }
    public class ModificarContrasenaRequest
    {
        public decimal Cedula { get; set; }
        public string Contrasena { get; set; }
    }
}
