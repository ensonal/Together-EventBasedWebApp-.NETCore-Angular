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
    public string? EventImageUrl { get; set; }
}