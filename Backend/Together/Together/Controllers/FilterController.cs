using Microsoft.AspNetCore.Mvc;
using Together.Contracts;

namespace Together.Controllers;

public class FilterController : ControllerBase
{
    private readonly IFilterService _filterService;
    
    public FilterController(IFilterService filterService)
    {
        _filterService = filterService;
    }

    [HttpGet]
    [Route("filters/sport")]
    public async Task<IActionResult> GetSportFilters()
    {
        var filters = await _filterService.GetSportFilters();
        return Ok(filters);
    }
    
    [HttpGet]
    [Route("filters/sport-experience")]
    public async Task<IActionResult> GetSportExperienceFilters()
    {
        var filters = await _filterService.GetSportExperienceFilters();
        return Ok(filters);
    }
    
    
}