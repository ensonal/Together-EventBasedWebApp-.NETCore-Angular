namespace Together.Core.Models.RequestManagementModels;

public class OutgoingRequestResponseModel
{
    public int UserEventRequestId { get; set; }
    public int UserEventId { get; set; }
    public string OwnerUserId { get; set; }
    public string GuestUserId { get; set; }
    public int EventRequestStatusId { get; set; }
    public DateTime RequestDate { get; set; }
    public EventViewModel EventView { get; set; }
}