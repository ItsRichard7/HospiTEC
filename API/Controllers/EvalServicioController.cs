using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using API.Class;

[ApiController]
[Route("[controller]")]
public class EvalServicioController : ControllerBase
{
    private readonly EvalServicioService _evalServicioService;

    public EvalServicioController(EvalServicioService evalServicioService)
    {
        _evalServicioService = evalServicioService;
    }

    [HttpPost("insert")]
    public async Task<IActionResult> InsertEvalServicio([FromBody] EvalServicio evalServicio)
    {
        // Asegurarse de que el Id esté vacío para que MongoDB lo genere automáticamente
        evalServicio.Id = null;

        await _evalServicioService.InsertEvalServicio(evalServicio);
        return Ok();
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllEvalServicio()
    {
        var documents = await _evalServicioService.GetAllEvalServicio();
        return Ok(documents);
    }
}
