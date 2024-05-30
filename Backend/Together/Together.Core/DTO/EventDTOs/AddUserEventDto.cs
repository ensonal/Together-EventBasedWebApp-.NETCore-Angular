using Together.Core.Models.EventModels;

namespace Together.Core.DTO.EventDTOs;

public class AddUserEventDto
{
    public int SportId { get; set; }
    public int SportExperienceId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime EventDate { get; set; }
    public string EventHour { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? EventImageUrl { get; set; }
}