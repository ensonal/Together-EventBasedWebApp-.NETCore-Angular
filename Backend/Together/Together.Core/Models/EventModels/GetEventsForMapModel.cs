namespace Together.Core.Models.EventModels;

public class GetEventsForMapModel
{
    public int UserEventId { get; set; }
    public string Title { get; set; }
    public string EventImageUrl { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}