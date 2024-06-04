using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Npgsql;

namespace API.Controllers
{
    [Route("api/reservaciones")]
    [ApiController]
    public class ReservacionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservacionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/reservaciones/usuario/{cedula}
        [HttpGet("usuario/{cedula}")]
        public async Task<ActionResult<IEnumerable<ReservacionUsuario>>> ObtenerReservacionesUsuario(decimal cedula)
        {
            var reservaciones = await _context.ReservacionUsuario
                .FromSqlRaw("SELECT * FROM fn_obtener_reservaciones_usuario({0})", cedula)
                .ToListAsync();

            if (reservaciones == null || reservaciones.Count == 0)
            {
                return NotFound();
            }

            return Ok(reservaciones);
        }

        // GET: api/reservaciones/cama/{numCama}
        [HttpGet("cama/{numCama}")]
        public async Task<ActionResult<IEnumerable<ReservacionCama>>> ObtenerReservacionesCama(int numCama)
        {
            var reservaciones = await _context.ReservacionCama
                .FromSqlRaw("SELECT * FROM fn_obtener_reservaciones_cama({0})", numCama)
                .ToListAsync();

            if (reservaciones == null || reservaciones.Count == 0)
            {
                return NotFound();
            }

            return Ok(reservaciones);
        }

        // POST: api/reservaciones/disponibilidad
        [HttpPost("disponibilidad")]
        public async Task<ActionResult<DisponibilidadResult>> VerificarDisponibilidadCama([FromBody] DisponibilidadRequest request)
        {
            var disponibilidad = await _context.Set<DisponibilidadResult>()
                .FromSqlInterpolated($"SELECT fn_verificar_disponibilidad_cama({request.NumCama}, {request.FechaIngreso}, {request.FechaSalida}) AS Disponibilidad")
                .FirstOrDefaultAsync();

            if (disponibilidad == null)
            {
                return NotFound();
            }

            return Ok(disponibilidad);
        }


        // POST: api/reservaciones/insertar
        [HttpPost("insertar")]
        public async Task<IActionResult> InsertarReservacionCama([FromBody] ReservacionCamaRequest request)
        {
            var sql = "SELECT fn_insertar_reservacion_cama(@p_user_ced, @p_num_cama, @p_fecha_ingreso, @p_fecha_salida)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_user_ced", request.cedula),
                new NpgsqlParameter("@p_num_cama", request.numeroCama),
                new NpgsqlParameter("@p_fecha_ingreso", request.fechaIngreso),
                new NpgsqlParameter("@p_fecha_salida", request.fechaSalida)
            };

            var result = await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok(result);
        }

        // POST: api/reservaciones/procedimiento
        [HttpPost("procedimiento")]
        public async Task<IActionResult> InsertarProcedimientoReservacion([FromBody] ProcedimientoReservacionRequest request)
        {
            var sql = "CALL up_insertar_procedimiento_reservacion(@p_id_procedimiento, @p_id_reservacion)";
            var parameters = new[]
            {
                new NpgsqlParameter("@p_id_procedimiento", request.IdProcedimiento),
                new NpgsqlParameter("@p_id_reservacion", request.IdReservacion)
            };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);
            return Ok("Procedimiento insertado en la reservación exitosamente.");
        }

    }


    public class ReservacionUsuario
    {
        public int id { get; set; }
        public int numeroCama { get; set; }
        public DateOnly fechaIngreso { get; set; }
        public DateOnly fechaSalida { get; set; }
    }

    public class ReservacionCama
    {
        public int id { get; set; }
        public decimal cedula { get; set; }
        public DateOnly fechaIngreso { get; set; }
        public DateOnly fechaSalida { get; set; }
    }

    public class DisponibilidadResult
    {
        public int disponibilidad { get; set; }
    }
    public class ReservacionCamaRequest
    {
        public decimal cedula { get; set; }
        public int numeroCama { get; set; }
        public DateOnly fechaIngreso { get; set; }
        public DateOnly fechaSalida { get; set; }
    }
    public class DisponibilidadRequest
    {
        public int NumCama { get; set; }
        public DateOnly FechaIngreso { get; set; }
        public DateOnly FechaSalida { get; set; }
    }

    public class ProcedimientoReservacionRequest
    {
        public int IdProcedimiento { get; set; }
        public int IdReservacion { get; set; }
    }


}
