namespace Together.Core.Models.NotificationModels;

public class NotificationResponseModel
{
    public int NotificationId { get; set; }
    public string UserId { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    public EventNotificationView Event { get; set; }
}