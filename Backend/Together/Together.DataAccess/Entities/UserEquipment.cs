namespace Together.DataAccess.Entities;

public class UserEquipment
{
    public int UserEquipmentId { get; set; }
    public string UserId { get; set; }
    public int SportId { get; set; }
    public string EquipmentName { get; set; }
    public string? ImageUrl { get; set; }
}