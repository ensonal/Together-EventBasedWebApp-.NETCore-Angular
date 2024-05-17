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

    [HttpPost]
    [Route("AddUserEvent")]
    public async Task<IActionResult> AddUserEvent(AddUserEventDto request)
    {
        var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
        var result = await _eventService.AddUserEvent(request, token);
        return Ok(result);
    }
    
    [HttpPost]
    [Route("DeleteUserEvent/{userEventId}")]
    public async Task<IActionResult> DeleteUserEvent(int userEventId)
    {
        var result = await _eventService.DeleteUserEvent(userEventId);
        return Ok(result);
    }
    
    [HttpGet]
    [Route("GetUserEvents")]
    public async Task<IActionResult> GetUserEvents()
    {
        var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
        var result = await _eventService.GetUserEvents(token);
        return Ok(result);
    }
    
    [HttpGet]
    [Route("GetAllEvents")]
    public async Task<IActionResult> GetAllEvents()
    {
        var result = await _eventService.GetAllEvents();
        return Ok(result);
    }
}
    
    