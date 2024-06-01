using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Class;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalonesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/salones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salon>>> GetSalones()
        {
            return await _context.Salones.FromSqlRaw("SELECT * FROM up_obtener_salones()").ToListAsync();
        }
    }
}
