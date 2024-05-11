using System.ComponentModel.Design;

namespace Together.DataAccess.Entities;

public class UserEventRequest
{
    public int UserEventRequestId { get; set; }
    public int UserEventId { get; set; }
    public string UserId { get; set; }
    public int EventRequestStatusId { get; set; }
    
    public virtual UserEvent UserEvents { get; set; }
    public virtual EventRequestStatus EventRequestStatuses { get; set; }
}