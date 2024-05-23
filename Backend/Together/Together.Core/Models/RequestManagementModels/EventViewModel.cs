namespace Together.Core.Models.RequestManagementModels;

public class EventViewModel
{
    public int UserEventId { get; set; }
    public string Title { get; set; }
    public DateTime EventDate { get; set; }
    public string EventHour { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string? EventImageUrl { get; set; }
}