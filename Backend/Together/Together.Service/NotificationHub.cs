using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace Together.Service;

public class NotificationHub : Hub
{
    private static readonly ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();

    public override Task OnConnectedAsync()
    {
        var userId = Context.GetHttpContext().Request.Query["userId"].ToString();
        Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var userId = Context.GetHttpContext().Request.Query["userId"].ToString();
        Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{userId}");
        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendNotification(string userId, string message)
    {
        if (_connections.TryGetValue(userId, out var connectionId))
        {
            await Clients.Client(connectionId).SendAsync("ReceiveNotification", message);
        }
        
        await Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", message);
    }
}