using Microsoft.AspNetCore.Mvc;
using Together.Contracts;
using Together.Core.DTO.EventDTOs;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    public async Task<IActionResult> AddUserEvent(AddUserEventDto request)
    {
        var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
        var result = await _eventService.AddUserEvent(request, token);
        return Ok(result);
    }
}
    
    