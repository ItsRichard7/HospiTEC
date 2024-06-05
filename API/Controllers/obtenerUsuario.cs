using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Class;

namespace API.Controllers
{
    [Route("api/obtenerUsuario")]
    [ApiController]
    public class obtenerUsuario
    {
        private readonly AppDbContext _context;

        public obtenerUsuario(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{cedula}")]
        public async Task<ActionResult<IEnumerable<Usuario2>>> GetUsuario2(decimal cedula)
        {
            var sql = "SELECT * FROM fn_obtener_info_usuario(@p_cedula)";
            var parameter = new Npgsql.NpgsqlParameter("@p_cedula", cedula);

            return await _context.Usuario2.FromSqlRaw(sql, parameter).ToListAsync();
        }
    }

    public class Usuario2
    {
        public decimal cedula { get; set; }
        public int rol { get; set; }
        public string pNombre { get; set; }
        public string sNombre { get; set; }
        public string pApellido { get; set; }
        public string sApellido { get; set; }
        public int edad { get; set; }  // Cambiar a DateTime
        public string pais { get; set; }
        public string provincia { get; set; }
        public string distrito { get; set; }
        public string domicilio { get; set; }
    }
}
