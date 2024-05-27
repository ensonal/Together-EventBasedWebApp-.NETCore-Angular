using Microsoft.AspNetCore.Mvc;
using Together.Contracts;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class NotificationController : ControllerBase
{
    private readonly INotificationService _notificationService;
    
    public NotificationController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }
    
    [HttpGet]
    [Route("GetUserNotifications")]
    public async Task<IActionResult> GetUserNotifications()
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        var result = await _notificationService.GetUserNotifications(token);
        return Ok(result);
    }
    
    [HttpPost]
    [Route("MarkNotificationAsRead/{notificationId}")]
    public async Task<IActionResult> MarkNotificationAsRead(int notificationId)
    {
        var token = HttpContext.Request.Headers.Authorization.ToString();
        await _notificationService.MarkNotificationAsRead(token, notificationId);
        return Ok();
    }
    
    
}