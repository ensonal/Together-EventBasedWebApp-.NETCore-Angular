using Together.DataAccess.Entities;

namespace Together.Core.Models.EventModels;

public class UpdateUserEventDto
{
    public int UserEventId { get; set; }
    public string Description { get; set; }
    public string Title { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string EventImageUrl { get; set; }
    public DateTime EventDate { get; set; }
    public string EventHour { get; set; }
    public int SportId { get; set; }
    public int SportExperienceId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}