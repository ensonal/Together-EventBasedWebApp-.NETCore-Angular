using Microsoft.AspNetCore.SignalR;
using Together.DataAccess;
using Together.DataAccess.Entities;
using Microsoft.Extensions.Logging;

namespace Together.Service;

public class NotificationHub : Hub
{
    private readonly TogetherDbContext _context;
    private readonly ILogger<NotificationHub> _logger;

    public NotificationHub(TogetherDbContext context, ILogger<NotificationHub> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task SendNotification(string userId, string message, int userEventId)
    {
        _logger.LogInformation($"Sending notification to user {userId}");

        var notification = new Notification
        {
            UserId = userId,
            UserEventId = userEventId,
            Message = message,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        await Clients.User(userId).SendAsync("ReceiveNotification", message, userEventId);
    }

    public override Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var userId = httpContext.Request.Query["userId"];
        if (!string.IsNullOrEmpty(userId))
        {
            _logger.LogInformation($"User {userId} connected");
            Groups.AddToGroupAsync(Context.ConnectionId, userId);
        }
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var httpContext = Context.GetHttpContext();
        var userId = httpContext.Request.Query["userId"];
        if (!string.IsNullOrEmpty(userId))
        {
            _logger.LogInformation($"User {userId} disconnected");
            Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
        }
        return base.OnDisconnectedAsync(exception);
    }
}