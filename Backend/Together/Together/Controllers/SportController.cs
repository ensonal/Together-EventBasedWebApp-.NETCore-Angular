using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.DataAccess.Entities;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class SportController : ControllerBase
{
    private readonly ISportService _sportService;

    public SportController(ISportService sportService)
    {
        _sportService = sportService;
    }
    
    [HttpGet]
    [Route("GetAllSports")]
    public async Task<List<Sport>> GetAllSports()
    {
        return await _sportService.GetAllSports();
    }
}