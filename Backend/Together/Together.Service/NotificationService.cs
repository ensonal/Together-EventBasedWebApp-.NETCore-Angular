using Microsoft.EntityFrameworkCore;
using Together.Contracts;
using Together.Core.Models.NotificationModels;
using Together.DataAccess;
using Together.DataAccess.Entities;

namespace Together.Service;

public class NotificationService : INotificationService
{
    private readonly IJwtService _jwtService;
    private readonly TogetherDbContext _context;
    
    public NotificationService(IJwtService jwtService, TogetherDbContext context)
    {
        _jwtService = jwtService;
        _context = context;
    }
    
    public async Task<List<Notification>> GetUserNotifications(string token)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);

        var notifications = await _context.Notifications
            .Where(x => x.UserId == userId)
            .ToListAsync();

        return notifications;
    }
    
    public async Task<bool> MarkNotificationAsRead(string token, int notificationId)
    {
        var userId = _jwtService.GetUserIdFromJWT(token);

        var notification = await _context.Notifications
            .Where(x => x.NotificationId == notificationId && x.UserId == userId)
            .FirstOrDefaultAsync();

        if (notification == null)
        {
            return false;
        }
        
        notification.IsRead = true;
        await _context.SaveChangesAsync();
        
        return true;
    }
}