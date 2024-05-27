namespace Together.Core.Models.NotificationModels;

public class EventNotificationView
{
    public int UserEventId { get; set; }
    public string Title { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string? EventImageUrl { get; set; }
}