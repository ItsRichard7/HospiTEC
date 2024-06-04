using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using global::API.Models;
namespace API.Controllers
{
    namespace API.Controllers
    {
        [Route("api/historialmedico")]
        [ApiController]
        public class HistorialMedicoController : ControllerBase
        {
            private readonly AppDbContext _context;

            public HistorialMedicoController(AppDbContext context)
            {
                _context = context;
            }

            // POST: api/historialmedico
            [HttpPost]
            public async Task<ActionResult> IngresarHistorialMedico([FromBody] HistorialMedico historialMedico)
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "CALL up_ingresar_historial_medico({0}, {1}, {2}, {3})",
                    historialMedico.cedula, historialMedico.fecha_procedimiento, historialMedico.procedimiento_realizado, historialMedico.tratamiento_prescrito);

                return Ok(result);
            }

            // PUT: api/historialmedico/{id}
            [HttpPut]
            public async Task<ActionResult> EditarHistorialMedico([FromBody] HistorialMedicoModif historialMedico)
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
                    "CALL up_editar_historial({0}, {1}, {2}, {3}, {4})",
                    historialMedico.id, historialMedico.cedula, historialMedico.fecha_procedimiento, historialMedico.procedimiento_realizado, historialMedico.tratamiento_prescrito);

                return Ok(result);
            }
            // GET: api/historialmedico/{userCed}
            [HttpGet("{cedula}")]
            public async Task<ActionResult<IEnumerable<HistorialMedicoDetalle>>> ObtenerHistorialMedico(decimal cedula)
            {
                var historial = await _context.HistorialMedicoDetalle
                    .FromSqlRaw("SELECT * FROM fn_obtener_historial({0})", cedula)
                    .ToListAsync();

                if (historial == null || historial.Count == 0)
                {
                    return NotFound();
                }

                return Ok(historial);
            }
        }
    }
    public class HistorialMedico
    {
        public decimal cedula { get; set; }
        public DateOnly fecha_procedimiento { get; set; }
        public int procedimiento_realizado { get; set; }
        public string tratamiento_prescrito { get; set; }
    }
    public class HistorialMedicoModif
    {
        public int id { get; set; }
        public decimal cedula { get; set; }
        public DateOnly fecha_procedimiento { get; set; }
        public int procedimiento_realizado { get; set; }
        public string tratamiento_prescrito { get; set; }
    }
    public class HistorialMedicoDetalle
    {
        public int id { get; set; }
        public DateOnly fecha_procedimiento { get; set; }
        public int procedimiento_realizado { get; set; }
        public string nombre_procedimiento { get; set; }
        public string tratamiento_prescrito { get; set; }
    }

}
