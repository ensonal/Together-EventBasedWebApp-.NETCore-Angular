namespace Together.DataAccess.Entities;

public class UserEvent
{
    public int UserEventId { get; set; }
    public string UserId { get; set; }
    public int SportId { get; set; }
    public int EventStatusId { get; set; }
    public int SportExperienceId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime EventDate { get; set; }
    public TimeSpan EventHour { get; set; }
    public string Location { get; set; }
    
    public virtual Sport Sports { get; set; }
    public virtual EventStatus EventStatuses { get; set; }
    public virtual SportExperience SportExperiences { get; set; }
    public virtual UserEventRequest UserEventRequests { get; set; }
}