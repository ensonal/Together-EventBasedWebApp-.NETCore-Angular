using Together.DataAccess.Entities;

namespace Together.Core.Models.EventModels;

public class UserEventResponseModel
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
    public string Location { get; set; }
    public string? EventImageUrl { get; set; }
    public UserInfo UserInfo { get; set; }
}