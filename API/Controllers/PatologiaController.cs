using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/patologia")]
    [ApiController]
    public class PatologiaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatologiaController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/patologia
        [HttpPost]
        public async Task<ActionResult> InsertarPatologia([FromBody] Patologia patologia)
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "CALL up_insertar_patologia({0}, {1}, {2})",
                patologia.nombrePatologia, patologia.nombreTratamiento, patologia.cedula);

            return Ok(result);
        }
    }
    public class Patologia
    {
        public string nombrePatologia { get; set; }
        public string nombreTratamiento { get; set; }
        public decimal cedula { get; set; }
    }
}
