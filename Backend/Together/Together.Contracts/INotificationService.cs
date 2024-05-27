using Together.Core.Models.NotificationModels;
using Together.DataAccess.Entities;

namespace Together.Contracts;

public interface INotificationService
{
    Task<List<Notification>> GetUserNotifications(string token);
    Task<bool> MarkNotificationAsRead(string token, int notificationId);
}