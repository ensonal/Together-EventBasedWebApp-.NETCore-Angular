namespace Together.DataAccess.Entities;

public class Notification
{
    public int NotificationId { get; set; }
    public string UserId { get; set; }
    public int UserEventId { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    public virtual UserEvent UserEvent { get; set; }
}