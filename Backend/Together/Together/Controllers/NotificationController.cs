using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Controllers;

[ApiController]
[Route("[controller]")]
public class NotificationController : ControllerBase
{
    private readonly TogetherDbContext _context;

    public NotificationController(TogetherDbContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications(string userId)
    {
        var notifications = await _context.Notifications
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .ToListAsync();

        return Ok(notifications);
    }

    [HttpPost("mark-as-read/{notificationId}")]
    public async Task<IActionResult> MarkAsRead(int notificationId)
    {
        var notification = await _context.Notifications.FindAsync(notificationId);
        if (notification == null)
        {
            return NotFound();
        }

        notification.IsRead = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}