namespace Together.DataAccess.Entities;

public class UserEventLocation
{
    public int UserEventLocationId { get; set; }
    public int UserEventId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public virtual UserEvent UserEvent { get; set; }
}