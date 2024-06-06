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
    public string EventHour { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string? EventImageUrl { get; set; }
    
    public virtual UserInfo UserInfo { get; set; }
    public virtual Sport Sport { get; set; }
    public virtual EventStatus EventStatus { get; set; }
    public virtual SportExperience SportExperience { get; set; }
    public virtual ICollection<UserFavoriteEvent> UserFavoriteEvents { get; set; }
    public virtual ICollection<UserEventRequest> UserEventRequest { get; set; }
    public virtual ICollection<UserEventLocation> UserEventLocations { get; set; }
    public virtual ICollection<ChatRoom> ChatRooms { get; set; }
    public virtual ICollection<Notification> Notifications { get; set; }
    
}