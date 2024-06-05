using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Class;

namespace API.Controllers
{
    [Route("api/obtenerSalones")]
    [ApiController]
    public class obtenerSalones : ControllerBase
    {
        private readonly AppDbContext _context;

        public obtenerSalones(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/salones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salon>>> GetSalones()
        {
            return await _context.Salones.FromSqlRaw("SELECT * FROM fn_obtener_salones()").ToListAsync();
        }
    }
}
